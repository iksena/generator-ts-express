<%_ if (healthcheck) { _%>
import healthcheck from './healthcheck';

export default [
  ...healthcheck,
];
<%_ } else { _%>
export default [];
<%_ } _%>
