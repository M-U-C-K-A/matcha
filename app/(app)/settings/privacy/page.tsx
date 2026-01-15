"use client"

import { useState } from "react"
import { SettingsLayout } from "@/components/settings/settings-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, UserX, MessageCircleOff, AlertTriangle } from "lucide-react"

export default function PrivacyPage() {
	const [profileVisible, setProfileVisible] = useState(true)
	const [showOnlineStatus, setShowOnlineStatus] = useState(true)
	const [showReadReceipts, setShowReadReceipts] = useState(true)
	const [showDistance, setShowDistance] = useState(true)

	// Mock blocked users
	const blockedUsers = [
		{ id: 1, name: "John Doe", avatar: "https://i.pravatar.cc/40?img=1" },
		{ id: 2, name: "Jane Smith", avatar: "https://i.pravatar.cc/40?img=5" },
	]

	return (
		<SettingsLayout>
			<div className="space-y-8">
				{/* Page Header */}
				<div>
					<h1 className="text-2xl font-bold tracking-tight">Privacy & Safety</h1>
					<p className="text-muted-foreground">
						Control your visibility and manage blocked users.
					</p>
				</div>

				{/* Profile Visibility */}
				<Card>
					<CardHeader>
						<CardTitle className="text-lg flex items-center gap-2">
							<Eye className="h-5 w-5 text-primary" />
							Profile Visibility
						</CardTitle>
						<CardDescription>
							Control what others can see about you.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label>Show my profile in discovery</Label>
								<p className="text-sm text-muted-foreground">
									When disabled, you won't appear in others' suggestions.
								</p>
							</div>
							<Switch checked={profileVisible} onCheckedChange={setProfileVisible} />
						</div>

						<Separator />

						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label>Show online status</Label>
								<p className="text-sm text-muted-foreground">
									Others can see when you're online.
								</p>
							</div>
							<Switch checked={showOnlineStatus} onCheckedChange={setShowOnlineStatus} />
						</div>

						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label>Show read receipts</Label>
								<p className="text-sm text-muted-foreground">
									Others can see when you've read their messages.
								</p>
							</div>
							<Switch checked={showReadReceipts} onCheckedChange={setShowReadReceipts} />
						</div>

						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label>Show distance</Label>
								<p className="text-sm text-muted-foreground">
									Show your distance from other users.
								</p>
							</div>
							<Switch checked={showDistance} onCheckedChange={setShowDistance} />
						</div>
					</CardContent>
				</Card>

				{/* Blocked Users */}
				<Card>
					<CardHeader>
						<CardTitle className="text-lg flex items-center gap-2">
							<UserX className="h-5 w-5 text-destructive" />
							Blocked Users
						</CardTitle>
						<CardDescription>
							Users you've blocked can't see your profile or contact you.
						</CardDescription>
					</CardHeader>
					<CardContent>
						{blockedUsers.length > 0 ? (
							<div className="space-y-3">
								{blockedUsers.map((user) => (
									<div key={user.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
										<div className="flex items-center gap-3">
											<img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full" />
											<span className="font-medium">{user.name}</span>
										</div>
										<Button variant="outline" size="sm">
											Unblock
										</Button>
									</div>
								))}
							</div>
						) : (
							<p className="text-muted-foreground text-center py-8">
								You haven't blocked anyone.
							</p>
						)}
					</CardContent>
				</Card>

				{/* Safety */}
				<Card>
					<CardHeader>
						<CardTitle className="text-lg flex items-center gap-2">
							<AlertTriangle className="h-5 w-5 text-amber-500" />
							Safety Center
						</CardTitle>
						<CardDescription>
							Resources and tools to stay safe.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<Button variant="outline" className="w-full justify-start gap-2">
							<MessageCircleOff className="h-4 w-4" />
							Report a problem
						</Button>
						<Button variant="outline" className="w-full justify-start gap-2 text-destructive hover:text-destructive">
							<UserX className="h-4 w-4" />
							Delete my account
						</Button>
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
