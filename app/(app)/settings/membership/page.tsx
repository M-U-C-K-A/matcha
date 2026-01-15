"use client"

import { SettingsLayout } from "@/components/settings/settings-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Crown, Check, Sparkles, Zap, Eye, MessageCircle, Users } from "lucide-react"

const features = [
	{ icon: Zap, title: "Unlimited Likes", description: "Like as many profiles as you want" },
	{ icon: Eye, title: "See Who Likes You", description: "View everyone who liked your profile" },
	{ icon: MessageCircle, title: "Priority Messages", description: "Your messages appear at the top" },
	{ icon: Users, title: "Advanced Filters", description: "Access premium search filters" },
	{ icon: Sparkles, title: "Boost Profile", description: "Get 5x more visibility each month" },
]

export default function MembershipPage() {
	return (
		<SettingsLayout>
			<div className="space-y-8">
				{/* Page Header */}
				<div>
					<h1 className="text-2xl font-bold tracking-tight">Membership</h1>
					<p className="text-muted-foreground">
						Manage your subscription and discover premium features.
					</p>
				</div>

				{/* Current Plan */}
				<Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-transparent">
					<CardHeader>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
									<Crown className="h-6 w-6 text-primary" />
								</div>
								<div>
									<CardTitle className="text-lg flex items-center gap-2">
										Matcha Premium
										<Badge className="bg-primary/20 text-primary hover:bg-primary/30">Active</Badge>
									</CardTitle>
									<CardDescription>
										Your subscription renews on Feb 15, 2026
									</CardDescription>
								</div>
							</div>
							<div className="text-right">
								<p className="text-2xl font-bold">€9.99</p>
								<p className="text-sm text-muted-foreground">/month</p>
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<div className="flex gap-3">
							<Button variant="outline">Cancel Subscription</Button>
							<Button variant="outline">Change Plan</Button>
						</div>
					</CardContent>
				</Card>

				{/* Premium Features */}
				<Card>
					<CardHeader>
						<CardTitle className="text-lg flex items-center gap-2">
							<Sparkles className="h-5 w-5 text-amber-500" />
							Premium Features
						</CardTitle>
						<CardDescription>
							Your current plan includes these benefits.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{features.map((feature, i) => (
								<div key={i} className="flex items-center gap-4">
									<div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
										<feature.icon className="h-5 w-5 text-primary" />
									</div>
									<div className="flex-1">
										<p className="font-medium">{feature.title}</p>
										<p className="text-sm text-muted-foreground">{feature.description}</p>
									</div>
									<Check className="h-5 w-5 text-green-500 shrink-0" />
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				{/* Payment Method */}
				<Card>
					<CardHeader>
						<CardTitle className="text-lg">Payment Method</CardTitle>
						<CardDescription>
							Manage your payment information.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
							<div className="flex items-center gap-3">
								<div className="h-10 w-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-md flex items-center justify-center text-white text-xs font-bold">
									VISA
								</div>
								<div>
									<p className="font-medium">•••• •••• •••• 4242</p>
									<p className="text-sm text-muted-foreground">Expires 12/27</p>
								</div>
							</div>
							<Button variant="outline" size="sm">Update</Button>
						</div>
					</CardContent>
				</Card>

				{/* Billing History */}
				<Card>
					<CardHeader>
						<CardTitle className="text-lg">Billing History</CardTitle>
						<CardDescription>
							Your recent transactions.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							{[
								{ date: "Jan 15, 2026", amount: "€9.99", status: "Paid" },
								{ date: "Dec 15, 2025", amount: "€9.99", status: "Paid" },
								{ date: "Nov 15, 2025", amount: "€9.99", status: "Paid" },
							].map((invoice, i) => (
								<div key={i} className="flex items-center justify-between py-2">
									<div>
										<p className="font-medium">Matcha Premium</p>
										<p className="text-sm text-muted-foreground">{invoice.date}</p>
									</div>
									<div className="flex items-center gap-3">
										<Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
											{invoice.status}
										</Badge>
										<span className="font-medium">{invoice.amount}</span>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</SettingsLayout>
	)
}
