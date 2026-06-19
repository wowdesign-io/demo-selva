'use client';
import { useRouter } from 'next/navigation';
import { useStoryblokBridge } from '@storyblok/react';

export default function PressIndexBridge({ storyId }: { storyId: number }) {
  const router = useRouter();
  useStoryblokBridge(storyId, () => router.refresh());
  return null;
}
