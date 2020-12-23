<% if (healthcheck) {%>
import getHealthcheck from './get';

export default [
  getHealthcheck,
];
<% } else { %>
export default [];
<% } %>

