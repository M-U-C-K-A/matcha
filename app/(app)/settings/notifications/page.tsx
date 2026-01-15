"use client"

import { useState } from "react"
import { SettingsLayout } from "@/components/settings/settings-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Bell, Mail, MessageCircle, Heart, Users, Smartphone } from "lucide-react"

export default function NotificationsPage() {
	const [pushEnabled, setPushEnabled] = useState(true)
	const [emailEnabled, setEmailEnabled] = useState(true)

	// Individual notification settings
	const [newMatch, setNewMatch] = useState(true)
	const [newMessage, setNewMessage] = useState(true)
	const [newLike, setNewLike] = useState(true)
	const [profileVisit, setProfileVisit] = useState(true)
	const [promotions, setPromotions] = useState(false)

	return (
		<SettingsLayout>
			<div className="space-y-8">
				{/* Page Header */}
				<div>
					<h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
					<p className="text-muted-foreground">
						Choose what notifications you receive and how.
					</p>
				</div>

				{/* Notification Channels */}
				<Card>
					<CardHeader>
						<CardTitle className="text-lg">Notification Channels</CardTitle>
						<CardDescription>
							Enable or disable notification methods.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
									<Smartphone className="h-5 w-5 text-primary" />
								</div>
								<div className="space-y-0.5">
									<Label>Push Notifications</Label>
									<p className="text-sm text-muted-foreground">
										Receive notifications on your device.
									</p>
								</div>
							</div>
							<Switch checked={pushEnabled} onCheckedChange={setPushEnabled} />
						</div>

						<Separator />

						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
									<Mail className="h-5 w-5 text-blue-500" />
								</div>
								<div className="space-y-0.5">
									<Label>Email Notifications</Label>
									<p className="text-sm text-muted-foreground">
										Receive notifications via email.
									</p>
								</div>
							</div>
							<Switch checked={emailEnabled} onCheckedChange={setEmailEnabled} />
						</div>
					</CardContent>
				</Card>

				{/* Activity Notifications */}
				<Card>
					<CardHeader>
						<CardTitle className="text-lg flex items-center gap-2">
							<Bell className="h-5 w-5 text-primary" />
							Activity Notifications
						</CardTitle>
						<CardDescription>
							Choose which activities trigger notifications.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between py-2">
							<div className="flex items-center gap-3">
								<Heart className="h-5 w-5 text-red-500" />
								<div>
									<Label>New Matches</Label>
									<p className="text-sm text-muted-foreground">
										When you match with someone.
									</p>
								</div>
							</div>
							<Switch checked={newMatch} onCheckedChange={setNewMatch} />
						</div>

						<Separator />

						<div className="flex items-center justify-between py-2">
							<div className="flex items-center gap-3">
								<MessageCircle className="h-5 w-5 text-green-500" />
								<div>
									<Label>New Messages</Label>
									<p className="text-sm text-muted-foreground">
										When you receive a new message.
									</p>
								</div>
							</div>
							<Switch checked={newMessage} onCheckedChange={setNewMessage} />
						</div>

						<Separator />

						<div className="flex items-center justify-between py-2">
							<div className="flex items-center gap-3">
								<Heart className="h-5 w-5 text-pink-500" />
								<div>
									<Label>New Likes</Label>
									<p className="text-sm text-muted-foreground">
										When someone likes you.
									</p>
								</div>
							</div>
							<Switch checked={newLike} onCheckedChange={setNewLike} />
						</div>

						<Separator />

						<div className="flex items-center justify-between py-2">
							<div className="flex items-center gap-3">
								<Users className="h-5 w-5 text-blue-500" />
								<div>
									<Label>Profile Visits</Label>
									<p className="text-sm text-muted-foreground">
										When someone views your profile.
									</p>
								</div>
							</div>
							<Switch checked={profileVisit} onCheckedChange={setProfileVisit} />
						</div>
					</CardContent>
				</Card>

				{/* Marketing */}
				<Card>
					<CardHeader>
						<CardTitle className="text-lg">Marketing & Promotions</CardTitle>
						<CardDescription>
							Promotional content and news from Matcha.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label>Promotional emails</Label>
								<p className="text-sm text-muted-foreground">
									Tips, events, and special offers.
								</p>
							</div>
							<Switch checked={promotions} onCheckedChange={setPromotions} />
						</div>
					</CardContent>
				</Card>

				{/* Save */}
				<div className="flex justify-end gap-3">
					<Button variant="outline">Cancel</Button>
					<Button className="bg-primary hover:bg-primary-hover">
						Save Changes
					</Button>
				</div>
			</div>
		</SettingsLayout>
	)
}
