
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Send } from "lucide-react"

export default function ChatPage() {
    return (
        <div className="flex h-[calc(100vh-8rem)] flex-col md:flex-row gap-6">
            {/* Chat Sidebar */}
            <div className="w-full md:w-80 flex flex-col border rounded-xl overflow-hidden bg-muted/30">
                <div className="p-4 border-b">
                    <h3 className="font-semibold">Conversations</h3>
                </div>
                <ScrollArea className="flex-1">
                    <div className="p-2 space-y-2">
                        {[...Array(5)].map((_, i) => (
                            <Button key={i} variant="ghost" className="w-full justify-start h-auto py-3">
                                <div className="flex items-center gap-3 text-left">
                                    <div className="h-10 w-10 rounded-full bg-slate-300 animate-pulse" />
                                    <div className="flex flex-col overflow-hidden">
                                        <span className="font-medium truncate">User {i + 1}</span>
                                        <span className="text-xs text-muted-foreground truncate">Last message content...</span>
                                    </div>
                                </div>
                            </Button>
                        ))}
                    </div>
                </ScrollArea>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col border rounded-xl overflow-hidden bg-background">
                <div className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-slate-300" />
                        <h3 className="font-semibold">User 1</h3>
                    </div>
                    <Button variant="ghost" size="icon">...</Button>
                </div>

                <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                        <div className="flex justify-start">
                            <div className="bg-muted px-4 py-2 rounded-lg max-w-[80%]">
                                Hey! How are you?
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg max-w-[80%]">
                                I'm doing great, thanks!
                            </div>
                        </div>
                    </div>
                </ScrollArea>

                <div className="p-4 border-t gap-2 flex">
                    <Input placeholder="Type a message..." className="flex-1" />
                    <Button size="icon">
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
