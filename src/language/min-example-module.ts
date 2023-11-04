import type { DefaultSharedModuleContext, LangiumServices, LangiumSharedServices, Module, PartialLangiumServices } from 'langium';
import { createDefaultModule, createDefaultSharedModule, inject } from 'langium';
import { MinExampleGeneratedModule, MinExampleGeneratedSharedModule } from './generated/module.js';
import { MinExampleCompletionProvider } from '../min-example-completion-provider.js';

/**
 * Declaration of custom services - add your own service classes here.
 */
export type MinExampleAddedServices = {
}

/**
 * Union of Langium default services and your custom services - use this as constructor parameter
 * of custom service classes.
 */
export type MinExampleServices = LangiumServices & MinExampleAddedServices

/**
 * Dependency injection module that overrides Langium default services and contributes the
 * declared custom services. The Langium defaults can be partially specified to override only
 * selected services, while the custom services must be fully specified.
 */
export const MinExampleModule: Module<MinExampleServices, PartialLangiumServices & MinExampleAddedServices> = {
    lsp: {
        CompletionProvider: (services) => new MinExampleCompletionProvider(services)
    }
};

/**
 * Create the full set of services required by Langium.
 *
 * First inject the shared services by merging two modules:
 *  - Langium default shared services
 *  - Services generated by langium-cli
 *
 * Then inject the language-specific services by merging three modules:
 *  - Langium default language-specific services
 *  - Services generated by langium-cli
 *  - Services specified in this file
 *
 * @param context Optional module context with the LSP connection
 * @returns An object wrapping the shared services and the language-specific services
 */
export function createMinExampleServices(context: DefaultSharedModuleContext): {
    shared: LangiumSharedServices,
    MinExample: MinExampleServices
} {
    const shared = inject(
        createDefaultSharedModule(context),
        MinExampleGeneratedSharedModule
    );
    const MinExample = inject(
        createDefaultModule({ shared }),
        MinExampleGeneratedModule,
        MinExampleModule
    );
    shared.ServiceRegistry.register(MinExample);
    return { shared, MinExample };
}
