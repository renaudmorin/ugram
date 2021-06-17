import React from 'react';
require('../../../styles/Shared/Error/ErrorPage.scoped.scss');
function ErrorPage() {
  return (
    <div className="Error">
      <h2> This page is unfortunately not available. </h2>
      <h1> The link may be broken, or the page has been deleted.</h1>
      <a href="/"> Go back to uGram. </a>
    </div>
  );
}

export default ErrorPage;
