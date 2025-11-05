/**
 * Валидатор sidebar items
 * Экспорт всех компонентов валидации sidebar items
 */

export * from './types';
export { 
  validateSidebarItems, 
  getSidebarValidationReport,
  type SidebarValidationError,
  type SidebarValidationResult 
} from './sidebarValidator';
export * from './useSidebarValidator';


