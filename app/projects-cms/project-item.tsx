"use client";

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { cn } from "@/lib/utils"; 
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { GripVertical } from 'lucide-react';
import { Project } from '@/lib/types';

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
                        <div 
                            {...listeners}
                            className="p-2 cursor-grab active:cursor-grabbing"
                            aria-label="Drag to reorder"
                        >
                            <GripVertical className="h-5 w-5 text-muted-foreground" />
                        </div>
                    </div>
                </CardHeader>
            </Card>
        </div>
    );
}