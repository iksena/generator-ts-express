<%_ if (hasRoute) { _%>
import <%= route.name %> from './<%= route.name %>';

export default [
  ...<%= route.name %>,
];
<%_ } else { _%>
export default [];
<%_ } _%>
