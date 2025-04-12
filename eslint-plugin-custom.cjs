module.exports = {
  rules: {
    'no-hex-colors': {
      create: function (context) {
        return {
          Literal(node) {
            if (typeof node.value === 'string' && /#([0-9A-Fa-f]{3}){1,2}\b/.test(node.value)) {
              context.report({
                node,
                message: 'Hex colors are not allowed.',
              });
            }
          },
        };
      },
    },
    'no-global-state-mutation': {
      create: function (context) {
        return {
          ExpressionStatement(node) {
            if (
              node.expression.type === 'AssignmentExpression' &&
              node.expression.left.object &&
              (node.expression.left.object.name === 'window' ||
                node.expression.left.object.name === 'document')
            ) {
              context.report({
                node,
                message: 'Do not mutate global state directly from components.',
              });
            }
          },
        };
      },
    },
    'no-inline-styles': {
      create: function (context) {
        return {
          JSXAttribute(node) {
            if (node.name.name === 'style') {
              context.report({
                node,
                message: 'Inline styles are not allowed in React components.',
              });
            }
          },
        };
      },
    },
  },
};
