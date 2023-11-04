import { CompletionAcceptor, CompletionContext, DefaultCompletionProvider, GrammarAST, MaybePromise, NextFeature } from "langium";
import { BoolType, isVariable } from "./language/generated/ast.js";

export class MinExampleCompletionProvider extends DefaultCompletionProvider { 

    override completionFor(context: CompletionContext, next: NextFeature, acceptor: CompletionAcceptor): MaybePromise<void> {
        console.log(context.node?.$type)
        if(isVariable(context.node) && context.features[0]?.type?.endsWith('Value')) {
            if(context.node.type.$type === BoolType && GrammarAST.isKeyword(next.feature)) {
                return this.completionForKeyword(context, next.feature, acceptor);
            } else if (GrammarAST.isCrossReference(next.feature) && context.node) {
                return this.completionForCrossReference(context, next as NextFeature<GrammarAST.CrossReference>, acceptor);
            }
        } else {
            return super.completionFor(context, next, acceptor);
        }
    }

}