'use client';

import { createContext } from 'react';

import type { RunClubSession } from '@/components/run-club/runClub.data';

export const RunClubSessionContext = createContext<RunClubSession | undefined>(undefined);
