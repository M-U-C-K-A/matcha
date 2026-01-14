#!/usr/bin/env python3
"""
Matcha Setup Script
Automates:
1. PostgreSQL service check/start
2. Database creation
3. Schema application
4. Environment setup (venv + dependencies)
5. Database seeding
"""

import os
import subprocess
import sys
import time

# Colors
GREEN = "\033[92m"
YELLOW = "\033[93m"
RED = "\033[91m"
BLUE = "\033[94m"
RESET = "\033[0m"

APP_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCRIPTS_DIR = os.path.join(APP_DIR, "scripts")

def log(msg, color=BLUE):
    print(f"{color}[INFO] {msg}{RESET}")

def success(msg):
    print(f"{GREEN}[SUCCESS] {msg}{RESET}")

def error(msg):
    print(f"{RED}[ERROR] {msg}{RESET}")
    sys.exit(1)

def run_command(cmd, cwd=None, env=None, check=True):
    try:
        subprocess.run(
            cmd, 
            cwd=cwd, 
            env=env, 
            check=check, 
            shell=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        return True
    except subprocess.CalledProcessError as e:
        error(f"Command failed: {cmd}\nOutput: {e.stderr}")
        return False

def check_postgres():
    log("Checking PostgreSQL service status...")
    try:
        # Check if active
        res = subprocess.run("systemctl is-active postgresql", shell=True, stdout=subprocess.PIPE, text=True)
        if res.stdout.strip() != "active":
            log("PostgreSQL is not running. Attempting to start...", YELLOW)
            subprocess.run("sudo systemctl start postgresql", shell=True, check=True)
            success("PostgreSQL started.")
        else:
            success("PostgreSQL is running.")
    except Exception as e:
        error(f"Could not check/start PostgreSQL: {e}")

def setup_database():
    log("Setting up database 'matcha'...")
    user = os.getenv("USER") # Assuming current system user matches DB user
    
    # Check if DB exists
    res = subprocess.run(f"psql -h localhost -U {user} -lqt | cut -d \| -f 1 | grep -qw matcha", shell=True)
    if res.returncode != 0:
        log("Database 'matcha' not found. Creating...", YELLOW)
        run_command(f"createdb -h localhost -U {user} matcha")
        success("Database 'matcha' created.")
    else:
        log("Database 'matcha' already exists. Skipping creation.", GREEN)

    # Apply Schema
    log("Applying schema (init-db.sql)...")
    cmd = f'psql -h localhost -U {user} -d matcha -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;" && psql -h localhost -U {user} -d matcha -f init-db.sql'
    run_command(cmd, cwd=SCRIPTS_DIR)
    success("Schema applied successfully.")

def setup_python_env():
    log("Setting up Python virtual environment...")
    venv_path = os.path.join(SCRIPTS_DIR, "venv")
    
    if not os.path.exists(venv_path):
        log("Creating venv...", YELLOW)
        run_command("python3 -m venv venv", cwd=SCRIPTS_DIR)
    
    log("Installing dependencies...")
    pip_cmd = os.path.join(venv_path, "bin", "pip")
    run_command(f"{pip_cmd} install -r requirements.txt", cwd=SCRIPTS_DIR)
    success("Python environment ready.")

def seed_database():
    log("Seeding database (this may take a few seconds)...", YELLOW)
    venv_python = os.path.join(SCRIPTS_DIR, "venv", "bin", "python3")
    
    # Pass environment variables for seed script
    env = os.environ.copy()
    env["DB_HOST"] = "localhost"
    env["DB_USER"] = os.getenv("USER")
    env["DB_PASSWORD"] = "root" # TODO: Make this configurable or ask user
    
    run_command(f"{venv_python} seed_db.py", cwd=SCRIPTS_DIR, env=env)
    success("Database seeded successfully!")

def main():
    print(f"{BLUE}========================================{RESET}")
    print(f"{BLUE}      Matcha Automated Setup            {RESET}")
    print(f"{BLUE}========================================{RESET}")
    
    check_postgres()
    setup_database()
    setup_python_env()
    seed_database()
    
    print("\n")
    success("All done! Your environment is ready.")
    print(f"{BLUE}You can now run 'npm run dev' to start the application.{RESET}")

if __name__ == "__main__":
    main()
