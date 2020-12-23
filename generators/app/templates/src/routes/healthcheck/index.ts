<%_ if (healthcheck) { _%>
import getHealthcheck from './get';

export default [
  getHealthcheck,
];
<%_ } else { _%>
export default [];
<%_ } _%>

