import Link from "next/link";
import { Download, Building2, Cloud, Scale, ShieldCheck, Mail, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { PublicNavbar } from "@/components/public-navbar";

export default function LegalPage() {
	return (
		<div className="min-h-screen bg-muted/30">
			{/* Header */}
			<PublicNavbar />

			<main className="container mx-auto py-8 max-w-4xl">
				{/* Breadcrumb */}
				<nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
					<Link href="/" className="hover:text-foreground transition-colors">Home</Link>
					<ChevronRight className="h-4 w-4" />
					<span className="text-foreground">Legal Notice</span>
				</nav>

				{/* Title Section */}
				<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
					<div>
						<h1 className="text-4xl font-bold tracking-tight mb-2">Legal Notice</h1>
						<p className="text-muted-foreground">Mentions Légales & Editorial Information</p>
						<div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
							<span className="inline-flex items-center gap-1.5">
								<svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								Last updated: January 15, 2026
							</span>
						</div>
					</div>
					<Button variant="outline" className="gap-2 shrink-0">
						<Download className="h-4 w-4" />
						Download PDF
					</Button>
				</div>

				{/* Accordion Sections */}
				<div className="space-y-4">
					<Accordion className="space-y-4">
						{/* Editor & Company Information */}
						<AccordionItem value="editor" className="bg-card border rounded-xl px-6 shadow-sm">
							<AccordionTrigger className="hover:no-underline py-5">
								<div className="flex items-center gap-3">
									<div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 text-primary">
										<Building2 className="h-5 w-5" />
									</div>
									<span className="font-semibold text-base">Editor & Company Information</span>
								</div>
							</AccordionTrigger>
							<AccordionContent className="pb-6">
								<p className="text-muted-foreground mb-6">
									Matcha Dating is a registered trademark of <span className="font-semibold text-foreground">Matcha Media Group SAS</span>.
								</p>
								<div className="grid md:grid-cols-2 gap-6">
									<div>
										<p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Head Office</p>
										<p className="text-sm">42 Rue de l'Innovation, 75001 Paris, France</p>
									</div>
									<div>
										<p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Registration</p>
										<p className="text-sm">RCS Paris B 123 456 789</p>
										<p className="text-sm">Capital: 50,000€</p>
									</div>
									<div>
										<p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Director of Publication</p>
										<p className="text-sm">School 42, Project Lead</p>
									</div>
									<div>
										<p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Contact</p>
										<p className="text-sm">legal@matcha.42.fr</p>
										<p className="text-sm">+33 1 00 00 00 00</p>
									</div>
								</div>
							</AccordionContent>
						</AccordionItem>

						{/* Hosting Services */}
						<AccordionItem value="hosting" className="bg-card border rounded-xl px-6 shadow-sm">
							<AccordionTrigger className="hover:no-underline py-5">
								<div className="flex items-center gap-3">
									<div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-500/10 text-blue-500">
										<Cloud className="h-5 w-5" />
									</div>
									<span className="font-semibold text-base">Hosting Services</span>
								</div>
							</AccordionTrigger>
							<AccordionContent className="pb-6">
								<p className="text-muted-foreground mb-4">
									The Matcha platform is hosted on secure servers provided by:
								</p>
								<div className="grid md:grid-cols-2 gap-6">
									<div>
										<p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Hosting Provider</p>
										<p className="text-sm">Vercel Inc.</p>
										<p className="text-sm text-muted-foreground">340 S Lemon Ave #4133, Walnut, CA 91789, USA</p>
									</div>
									<div>
										<p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Database</p>
										<p className="text-sm">PostgreSQL on dedicated European servers</p>
										<p className="text-sm text-muted-foreground">GDPR Compliant Infrastructure</p>
									</div>
								</div>
							</AccordionContent>
						</AccordionItem>

						{/* Intellectual Property */}
						<AccordionItem value="intellectual" className="bg-card border rounded-xl px-6 shadow-sm">
							<AccordionTrigger className="hover:no-underline py-5">
								<div className="flex items-center gap-3">
									<div className="flex items-center justify-center h-10 w-10 rounded-lg bg-amber-500/10 text-amber-500">
										<Scale className="h-5 w-5" />
									</div>
									<span className="font-semibold text-base">Intellectual Property</span>
								</div>
							</AccordionTrigger>
							<AccordionContent className="pb-6">
								<div className="space-y-4 text-muted-foreground">
									<p>
										All content present on the Matcha platform, including but not limited to text, graphics,
										logos, icons, images, audio clips, and software, is the exclusive property of Matcha Media Group SAS
										or its content suppliers and is protected by international copyright laws.
									</p>
									<p>
										Any reproduction, representation, modification, publication, or adaptation of all or part of
										the elements of the site, regardless of the means or process used, is prohibited without prior
										written authorization from Matcha Media Group SAS.
									</p>
									<p>
										Unauthorized use of the site's content may result in legal action for infringement.
									</p>
								</div>
							</AccordionContent>
						</AccordionItem>

						{/* Privacy & Data Protection */}
						<AccordionItem value="privacy" className="bg-card border rounded-xl px-6 shadow-sm">
							<AccordionTrigger className="hover:no-underline py-5">
								<div className="flex items-center gap-3">
									<div className="flex items-center justify-center h-10 w-10 rounded-lg bg-green-500/10 text-green-500">
										<ShieldCheck className="h-5 w-5" />
									</div>
									<span className="font-semibold text-base">Privacy & Data Protection</span>
								</div>
							</AccordionTrigger>
							<AccordionContent className="pb-6">
								<p className="text-muted-foreground mb-4">
									In accordance with the General Data Protection Regulation (GDPR), you have the following rights:
								</p>
								<ul className="grid md:grid-cols-2 gap-3 mb-4">
									{[
										"Right of access to your personal data",
										"Right to rectification",
										"Right to erasure (right to be forgotten)",
										"Right to data portability",
										"Right to object to processing",
										"Right to withdraw consent"
									].map((right, i) => (
										<li key={i} className="flex items-center gap-2 text-sm">
											<span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
											{right}
										</li>
									))}
								</ul>
								<p className="text-muted-foreground text-sm">
									To exercise these rights, contact our Data Protection Officer at: <span className="font-medium text-foreground">privacy@matcha.42.fr</span>
								</p>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>

				{/* Contact Card */}
				<Card className="mt-8 bg-muted/50 border-0 shadow-sm">
					<CardContent className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6">
						<div>
							<h3 className="font-semibold text-lg mb-1">Need more information?</h3>
							<p className="text-muted-foreground text-sm">
								Our legal team is available to answer any regulatory or compliance questions you may have regarding our services.
							</p>
						</div>
						<Button className="gap-2 shrink-0">
							<Mail className="h-4 w-4" />
							Contact Legal Team
						</Button>
					</CardContent>
				</Card>
			</main>

			{/* Footer */}
			<footer className="border-t mt-16">
				<div className="container py-8 text-center text-sm text-muted-foreground">
					© 2026 Matcha Media Group SAS. All rights reserved.
				</div>
			</footer>
		</div>
	);
}
