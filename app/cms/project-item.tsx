"use client";

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { cn } from "@/lib/utils"; 
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { GripVertical, Pencil } from 'lucide-react';
import { Project } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function ProjectItem({ project }: { project: Project }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: project.id });

    const style: React.CSSProperties = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        transition,
        boxShadow: isDragging ? '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' : undefined,
        zIndex: isDragging ? 10 : undefined,
    };

    return (
        <div ref={setNodeRef} style={style}>
            <Card
                className={cn(
                    "mb-2",
                    { "bg-muted": isDragging }
                )}
                {...attributes}
            >
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-lg font-medium">{project.title}</CardTitle>
                        <div className="flex items-center gap-2">
                            <Link href={`/cms/edit/${project.id}`}>
                                <Button variant="ghost" size="icon">
                                    <Pencil className="h-4 w-4" />
                                </Button>
                            </Link>
                            <div {...listeners} className="p-2 cursor-grab active:cursor-grabbing">
                                <GripVertical className="h-5 w-5 text-muted-foreground" />
                            </div>
                        </div>
                    </div>
                </CardHeader>
            </Card>
        </div>
    );
}