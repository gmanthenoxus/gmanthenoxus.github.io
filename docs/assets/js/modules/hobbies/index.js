// Hobbies Module - Main Entry Point
// Coordinates all hobby-related functionality

import { ready } from '../../utils/dom.js';
import { initHobbyFilter } from './filter.js';
import { initHobbyAnimations } from './animations.js';
import { initHobbyInteractive } from './interactive.js';
import { initCollapsibleSections } from './collapsible.js';

/**
 * Initialize all hobby functionality
 */
export function initHobbies() {
    ready(() => {
        initHobbyFilter();
        initHobbyAnimations();
        initHobbyInteractive();
        initCollapsibleSections();
    });
}

// Auto-initialize if this module is loaded directly
if (typeof window !== 'undefined') {
    initHobbies();
}
