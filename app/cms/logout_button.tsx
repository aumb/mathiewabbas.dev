// file: app/cms/logout-button.tsx
"use client";

import { useTransition } from "react";
import { logout } from "./actions"; 

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function LogoutButton() {
    const [isPending, startTransition] = useTransition();

    const handleLogout = () => {
        startTransition(async () => {
            await logout();
        });
    };

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={handleLogout}
            disabled={isPending}
            aria-label="Log out"
        >
            <LogOut className="h-4 w-4" />
        </Button>
    );
}