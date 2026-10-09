"use client";

import { useState } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { reorderProjects } from './actions';
import { ProjectItem } from './project-item';
import { Project } from '@/lib/types';

export function ProjectList({ initialProjects }: { initialProjects: Project[] }) {
    const [projects, setProjects] = useState(initialProjects);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    async function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = projects.findIndex((p) => p.id === active.id);
            const newIndex = projects.findIndex((p) => p.id === over.id);

            const reorderedProjects = arrayMove(projects, oldIndex, newIndex);
            
            setProjects(reorderedProjects);

            await reorderProjects(reorderedProjects.map((project) => project.id));
        }
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={projects.map(p => p.id)}
                strategy={verticalListSortingStrategy}
            >
                {projects.map(project => (
                    <ProjectItem key={project.id} project={project} />
                ))}
            </SortableContext>
        </DndContext>
    );
}