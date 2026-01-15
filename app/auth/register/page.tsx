"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon, ArrowRight, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Field,
    FieldLabel,
    FieldError,
    FieldGroup,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";
import PreferencesModal from "@/components/preferences-modal";

// Validation schema (simplified birthdate since Calendar returns Date)
const registerSchema = z
    .object({
        firstName: z.string().min(2, "Prénom requis (2 caractères min)").max(50, "Prénom requis (50 caractères max)").regex(/^[a-zA-Z ]+$/),
        lastName: z.string().min(2, "Nom requis (2 caractères min)").max(50, "Nom requis (50 caractères max)").regex(/^[a-zA-Z ]+$/),
        email: z.string().email("Email invalide"),
        birthdate: z.date({ message: "Date de naissance requise" }),
        password: z
            .string()
            .min(8, "8 caractères minimum")
            .regex(/[A-Z]/, "Une majuscule requise")
            .regex(/[a-z]/, "Une minuscule requise")
            .regex(/[0-9]/, "Un chiffre requis")
            .regex(/[^A-Za-z0-9]/, "Un caractère spécial requis"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Les mots de passe ne correspondent pas",
        path: ["confirmPassword"],
    });

type FormData = z.infer<typeof registerSchema>;
type FormErrors = Partial<Record<keyof FormData, string>>;

export default function RegisterPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const [serverError, setServerError] = useState<string | null>(null);
    const [showPreferencesModal, setShowPreferencesModal] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        birthdate: undefined as Date | undefined,
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        const newFormData = { ...formData, [id]: value };
        setFormData(newFormData);
        setErrors((prev) => ({ ...prev, [id]: undefined }));

        // Real-time password confirmation check
        if (id === "password" || id === "confirmPassword") {
            if (newFormData.confirmPassword && newFormData.password !== newFormData.confirmPassword) {
                setErrors((prev) => ({ ...prev, confirmPassword: "Les mots de passe ne correspondent pas" }));
            } else {
                setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
            }
        }
    };

    const handleDateChange = (date: Date | undefined) => {
        setFormData((prev) => ({ ...prev, birthdate: date }));
        setErrors((prev) => ({ ...prev, birthdate: undefined }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setServerError(null);

        const result = registerSchema.safeParse(formData);
        if (!result.success) {
            const fieldErrors: FormErrors = {};
            result.error.issues.forEach((err) => {
                const field = String(err.path[0]) as keyof FormData;
                fieldErrors[field] = err.message;
            });
            setErrors(fieldErrors);
            return;
        }

        setIsLoading(true);

        try {
            // Map form data to backend schema
            const { confirmPassword, birthdate, firstName, lastName, ...rest } = result.data;
            const payload = {
                ...rest,
                firstname: firstName,
                lastname: lastName,
                birthday: format(birthdate, "yyyy-MM-dd"),
            };

            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                setServerError(data.error || "Une erreur est survenue");
                setIsLoading(false);
                return;
            }

            // Show preferences modal instead of redirecting
            setIsLoading(false);
            setShowPreferencesModal(true);
        } catch {
            setServerError("Erreur de connexion au serveur");
            setIsLoading(false);
        }
    };

    const handlePreferencesComplete = () => {
        router.push("/browse");
    };

    const handlePreferencesSkip = () => {
        router.push("/browse");
    };

    return (
        <>
            {showPreferencesModal && (
                <PreferencesModal
                    onComplete={handlePreferencesComplete}
                    onSkip={handlePreferencesSkip}
                />
            )}
            <Card className="border-border shadow-xl w-full max-w-3xl mx-auto">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold text-primary">
                        Create an account
                    </CardTitle>
                    <CardDescription>Join thousands of professionals today</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="py-2">
                        <FieldGroup className="gap-4">
                            {serverError && (
                                <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg">
                                    {serverError}
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-3">
                                <Field data-invalid={!!errors.firstName}>
                                    <FieldLabel htmlFor="firstName">First name</FieldLabel>
                                    <Input
                                        id="firstName"
                                        placeholder="John"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />
                                    <FieldError>{errors.firstName}</FieldError>
                                </Field>

                                <Field data-invalid={!!errors.lastName}>
                                    <FieldLabel htmlFor="lastName">Last name</FieldLabel>
                                    <Input
                                        id="lastName"
                                        placeholder="Doe"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                    <FieldError>{errors.lastName}</FieldError>
                                </Field>
                            </div>

                            <Field data-invalid={!!errors.birthdate}>
                                <FieldLabel>Date of birth</FieldLabel>
                                <Popover>
                                    <PopoverTrigger
                                        className={cn(
                                            "w-full justify-start text-left font-normal inline-flex items-center h-9 px-3 rounded-md border border-input bg-transparent text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                            !formData.birthdate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {formData.birthdate ? (
                                            format(formData.birthdate, "dd MMMM yyyy", { locale: fr })
                                        ) : (
                                            <span>Choisir une date</span>
                                        )}
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={formData.birthdate}
                                            onSelect={handleDateChange}
                                            captionLayout="dropdown"
                                            fromYear={1925}
                                            toYear={new Date().getFullYear() - 18}
                                            defaultMonth={
                                                formData.birthdate ||
                                                new Date(new Date().getFullYear() - 25, 0)
                                            }
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FieldError>{errors.birthdate}</FieldError>
                            </Field>

                            <Field data-invalid={!!errors.email}>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                <FieldError>{errors.email}</FieldError>
                            </Field>

                            <Field data-invalid={!!errors.password}>
                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                <Input
                                    id="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <FieldError>{errors.password}</FieldError>
                            </Field>

                            <Field data-invalid={!!errors.confirmPassword}>
                                <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                                <FieldError>{errors.confirmPassword}</FieldError>
                            </Field>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full"
                                size="lg"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <>
                                        Create Account <ArrowRight className="w-4 h-4 ml-2" />
                                    </>
                                )}
                            </Button>
                        </FieldGroup>
                    </CardContent>
                </form>
                <CardFooter className="flex flex-col gap-4 text-center py-4">
                    <div className="text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link
                            href="/auth/login"
                            className="font-medium text-primary hover:underline hover:text-primary/80"
                        >
                            Sign in
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </>
    );
}
