'use client';

import { createContext } from 'react';
import type { RunClubSession } from './runClub.data';

export const RunClubSessionContext = createContext<RunClubSession | undefined>(undefined);
