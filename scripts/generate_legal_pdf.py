#!/usr/bin/env python3
"""
Script to generate the Legal Notice PDF for Matcha.
Uses reportlab to create a professional PDF document with comprehensive legal content.

Run: python scripts/generate_legal_pdf.py
Output: public/legal-notice.pdf
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
import os
import datetime

# Colors
PRIMARY_COLOR = HexColor("#7c3aed")  # Purple primary
DARK_COLOR = HexColor("#1f2937")
GRAY_COLOR = HexColor("#4b5563")

def create_legal_pdf():
    # Create public directory if it doesn't exist
    output_dir = os.path.join(os.path.dirname(__file__), "..", "public")
    os.makedirs(output_dir, exist_ok=True)
    output_path = os.path.join(output_dir, "legal-notice.pdf")

    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        rightMargin=2*cm,
        leftMargin=2*cm,
        topMargin=2*cm,
        bottomMargin=2*cm
    )

    # Styles
    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        'Title',
        parent=styles['Heading1'],
        fontSize=24,
        textColor=PRIMARY_COLOR,
        spaceAfter=20,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    )

    h1_style = ParagraphStyle(
        'Header1',
        parent=styles['Heading2'],
        fontSize=16,
        textColor=DARK_COLOR,
        spaceBefore=15,
        spaceAfter=10,
        fontName='Helvetica-Bold'
    )

    h2_style = ParagraphStyle(
        'Header2',
        parent=styles['Heading3'],
        fontSize=12,
        textColor=DARK_COLOR,
        spaceBefore=10,
        spaceAfter=5,
        fontName='Helvetica-Bold'
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontSize=10,
        textColor=GRAY_COLOR,
        spaceAfter=6,
        leading=14,
        alignment=TA_JUSTIFY
    )

    bullet_style = ParagraphStyle(
        'Bullet',
        parent=body_style,
        leftIndent=20,
        bulletIndent=10,
        spaceAfter=4
    )

    # Content Building
    story = []

    # --- Cover Page ---
    story.append(Spacer(1, 4*cm))
    story.append(Paragraph("TERMS OF SERVICE", title_style))
    story.append(Paragraph("&", title_style))
    story.append(Paragraph("PRIVACY POLICY", title_style))
    story.append(Spacer(1, 2*cm))
    story.append(Paragraph("Matcha Dating App", ParagraphStyle('Center', parent=body_style, alignment=TA_CENTER, fontSize=14)))
    story.append(Spacer(1, 1*cm))
    story.append(Paragraph(f"Last Updated: {datetime.date.today().strftime('%B %d, %Y')}", ParagraphStyle('Center', parent=body_style, alignment=TA_CENTER)))
    story.append(PageBreak())

    # --- Introduction ---
    story.append(Paragraph("1. LEGAL NOTICE & EDITOR INFORMATION", h1_style))
    story.append(Paragraph("1.1. Editor", h2_style))
    story.append(Paragraph("The Matcha application is published by Matcha Media Group SAS, a simplified joint-stock company with a capital of 50,000 euros, registered with the Paris Trade and Companies Register under number B 123 456 789.", body_style))
    story.append(Paragraph("Head Office: 42 Rue de l'Innovation, 75001 Paris, France.", body_style))
    story.append(Paragraph("Director of Publication: School 42 Project Lead.", body_style))

    story.append(Paragraph("1.2. Hosting", h2_style))
    story.append(Paragraph("The Service is hosted by Vercel Inc., located at 340 S Lemon Ave #4133, Walnut, CA 91789, USA. Data storage infrastructure is provided by PostgreSQL on secure European servers compliant with GDPR requirements.", body_style))

    # --- Terms of Service ---
    story.append(Paragraph("2. TERMS OF SERVICE (ToS)", h1_style))

    story.append(Paragraph("2.1. Acceptance of Terms", h2_style))
    story.append(Paragraph("By creating an account or using the Matcha app, you agree to be bound by these Terms. If you do not accept these Terms, do not use the Service.", body_style))

    story.append(Paragraph("2.2. Eligibility", h2_style))
    story.append(Paragraph("You must be at least 18 years of age to create an account on Matcha and use the Service. By creating an account, you represent and warrant that:", body_style))
    story.append(Paragraph("• You can form a binding contract with Matcha.", bullet_style))
    story.append(Paragraph("• You are not a person who is barred from using the Service under the laws of the United States, France, or any other applicable jurisdiction.", bullet_style))
    story.append(Paragraph("• You have never been convicted of a felony or indictable offense (or crime of similar severity), a sex crime, or any crime involving violence.", bullet_style))

    story.append(Paragraph("2.3. User Obligations", h2_style))
    story.append(Paragraph("You agree to:", body_style))
    story.append(Paragraph("• Provide accurate and current information during registration.", bullet_style))
    story.append(Paragraph("• Maintain the confidentiality of your login credentials.", bullet_style))
    story.append(Paragraph("• Interact respectfully with other users.", bullet_style))
    story.append(Paragraph("You agree NOT to:", body_style))
    story.append(Paragraph("• Impersonate any entity or person.", bullet_style))
    story.append(Paragraph("• " + "Stalk" + ", bully, abuse, harass, threaten, or intimidate others.", bullet_style))
    story.append(Paragraph("• Post any content that is hate speech, threatening, sexually explicit, or pornographic.", bullet_style))
    story.append(Paragraph("• Use the Service for any illegal purpose.", bullet_style))

    # --- GDPR & Privacy ---
    story.append(Paragraph("3. PRIVACY POLICY & GDPR COMPLIANCE", h1_style))

    story.append(Paragraph("3.1. Data Collection", h2_style))
    story.append(Paragraph("We collect information you fulfill to us, such as:", body_style))
    story.append(Paragraph("• Account Data: Name, email, date of birth, gender, sexual preference.", bullet_style))
    story.append(Paragraph("• Profile Data: Photos, biography, interests (tags), geolocation.", bullet_style))
    story.append(Paragraph("• Usage Data: Swipes, likes, visits, blocks, reports, and messages.", bullet_style))

    story.append(Paragraph("3.2. Purpose of Processing", h2_style))
    story.append(Paragraph("Your data is processed to:", body_style))
    story.append(Paragraph("• Create and manage your account.", bullet_style))
    story.append(Paragraph("• Provide the matching algorithm functionality.", bullet_style))
    story.append(Paragraph("• Ensure the security and safety of users (moderation).", bullet_style))
    story.append(Paragraph("• Comply with legal obligations.", bullet_style))

    story.append(Paragraph("3.3. Geolocation Data", h2_style))
    story.append(Paragraph("Matcha requires access to your geolocation to suggest profiles near you. You can revoke this permission at any time in your device settings, though this will limit the functionality of the App.", body_style))

    story.append(Paragraph("3.4. Data Retention", h2_style))
    story.append(Paragraph("We retain your personal information only as long as we need it for legitimate business purposes and as permitted by applicable law. If you delete your account, your data will be deleted or anonymized within 30 days, except where retention is required by law (e.g., traffic data for anti-terrorism laws).", body_style))

    story.append(Paragraph("3.5. Your Rights (GDPR)", h2_style))
    story.append(Paragraph("Under the General Data Protection Regulation (EU) 2016/679, you have the right to:", body_style))
    story.append(Paragraph("• Access your data (Article 15).", bullet_style))
    story.append(Paragraph("• Rectify inaccurate data (Article 16).", bullet_style))
    story.append(Paragraph("• Erase your data ('Right to be forgotten') (Article 17).", bullet_style))
    story.append(Paragraph("• Restrict processing (Article 18).", bullet_style))
    story.append(Paragraph("• Data portability (Article 20).", bullet_style))
    story.append(Paragraph("To exercise these rights, please contact our Data Protection Officer (DPO) at privacy@matcha.42.fr of via the 'Contact' section in the app.", body_style))

    # --- Liability ---
    story.append(Paragraph("4. LIABILITY & DISCLAIMERS", h1_style))

    story.append(Paragraph("4.1. Disclaimer of Warranties", h2_style))
    story.append(Paragraph("MATCH PROVIDES THE SERVICE ON AN 'AS IS' AND 'AS AVAILABLE' BASIS. WE DO NOT WARRANT THAT THE APP WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE.", body_style))

    story.append(Paragraph("4.2. Safety Disclaimer", h2_style))
    story.append(Paragraph("YOU ARE SOLELY RESPONSIBLE FOR YOUR INTERACTIONS WITH OTHER MEMBERS. YOU UNDERSTAND THAT MATCHA DOES NOT CONDUCT CRIMINAL BACKGROUND CHECKS ON ITS MEMBERS OR INQUIRE INTO THE BACKGROUND OF ITS MEMBERS. MATCH MAKES NO REPRESENTATIONS OR WARRANTIES AS TO THE CONDUCT OF MEMBERS.", body_style))

    story.append(Paragraph("4.3. Limitation of Liability", h2_style))
    story.append(Paragraph("TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT WILL MATCHA, ITS AFFILIATES, OFFICERS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL OR PUNITIVE DAMAGES, ARISING FROM OR RELATING TO YOUR USE OF THE SERVICE.", body_style))

    # --- Intellectual Property ---
    story.append(Paragraph("5. INTELLECTUAL PROPERTY", h1_style))
    story.append(Paragraph("All rights, title, and interest in and to the Service (excluding User Content) are and will remain the exclusive property of Matcha Media Group and its licensors. The trademarks, logos, and service marks displayed on the Service are the registered and unregistered marks of Matcha.", body_style))

    story.append(Paragraph("By submitting User Content (photos, bio), you grant Matcha a worldwide, transferable, sub-licensable, royalty-free right and license to host, store, use, copy, display, reproduce, adapt, edit, publish, modify, and distribute such User Content.", body_style))

    # --- Contact ---
    story.append(Spacer(1, 1*cm))
    story.append(Paragraph("CONTACT US", h1_style))
    story.append(Paragraph("For any questions regarding this agreement, please contact us:", body_style))
    story.append(Paragraph("Mail: legal@matcha.42.fr", bullet_style))
    story.append(Paragraph("Address: 42 Rue de l'Innovation, 75001 Paris, France", bullet_style))

    # --- Footer ---
    story.append(Spacer(1, 2*cm))
    story.append(Paragraph("© 2026 Matcha Media Group SAS. All rights reserved.", ParagraphStyle('Footer', parent=body_style, alignment=TA_CENTER, fontSize=8)))

    # Build PDF
    doc.build(story)
    print(f"✅ Comprehensive Legal PDF generated: {output_path}")
    return output_path

if __name__ == "__main__":
    create_legal_pdf()
