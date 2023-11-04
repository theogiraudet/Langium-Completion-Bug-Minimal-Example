grammar MinExample

entry Model:
    '{' variables+=Variable* '}';

Variable:
    'let' id=ID ':' type=Type ('=' value=Value)? ';';

Type: {IntType} 'int' | {BoolType} 'bool';

Value: IntValue | BoolValue;

IntValue:
    value=INT;

BoolValue:
    value?='true' | 'false';

interface IntType {}
interface BoolType {}


hidden terminal WS: /\s+/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;

hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;
