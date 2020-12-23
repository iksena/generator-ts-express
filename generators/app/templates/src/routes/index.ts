<% if (healthcheck) {%>
import healthcheck from './healthcheck';

export default [
  ...healthcheck,
];
<% } else { %>
export default [];
<% } %>
