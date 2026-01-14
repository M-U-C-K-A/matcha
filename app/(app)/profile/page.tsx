
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

export default function ProfilePage() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Profile</h3>
                <p className="text-sm text-muted-foreground">
                    This is how others will see you on the site.
                </p>
            </div>
            <Separator />
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                        id="bio"
                        placeholder="Tell us a little bit about yourself"
                        className="resize-none"
                    />
                    <p className="text-[0.8rem] text-muted-foreground">
                        You can <span>@mention</span> other users and organizations to link to them.
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="firstname">First Name</Label>
                        <Input id="firstname" placeholder="Max" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="lastname">Last Name</Label>
                        <Input id="lastname" placeholder="Robinson" />
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label>Interests (Tags)</Label>
                    <Input placeholder="#vegan, #geek, #climbing" />
                </div>
                <div className="flex justify-end">
                    <Button>Save changes</Button>
                </div>
            </div>
        </div>
    )
}
