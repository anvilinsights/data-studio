/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import * as React from 'react';
import { AdPreview as AdPreviewProps } from './../types';
import * as parseUrl from 'url-parse-lax';

interface Props {
  preview: AdPreviewProps;
}

const headlineStyles = css({
  color: '#4944b4'
});

const displayUrlStyles = css({
  color: '#196830'
});

const descriptionStyles = css({});

const AdPreview: React.SFC<Props> = ({ preview }) => {
  return (
    <div>
      <Headline preview={preview} />
      <DisplayURL preview={preview} />
      <Description preview={preview} />
    </div>
  );
};

const DisplayURL: React.SFC<Props> = ({ preview }) => {
  const { host, protocol } = parseUrl(preview.displayUrl);

  let url = `${protocol}//${host}/`;

  const path1 = dashToNull(preview.path1);
  const path2 = dashToNull(preview.path2);

  if (path1) {
    url += path1;

    if (path2) {
      url += `/${path2}`;
    }
  }

  return <div css={displayUrlStyles}>{url}</div>;
};

const dashToNull = (input: string): string | null => {
  return input === '--' ? null : input;
};

const Headline: React.SFC<Props> = ({ preview }) => {
  if (preview.headline) {
    return (
      <div css={headlineStyles}>
        <span>{preview.headline}</span>
      </div>
    );
  }

  return (
    <div css={headlineStyles}>
      <span>{preview.headline1}</span> - <span>{preview.headline2}</span>
    </div>
  );
};

const Description: React.SFC<Props> = ({ preview }) => {
  if (preview.description) {
    return (
      <React.Fragment>
        <div>{preview.description}</div>
        <div>--</div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <div>{preview.description1}</div>
      <div>{preview.description2}</div>
    </React.Fragment>
  );
};

export default AdPreview;
