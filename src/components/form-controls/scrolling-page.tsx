import React, { useCallback, useEffect, useState } from 'react';
import { pubSubService } from '../../pubsub';
import './form-group.scss';

interface ScrollingPageProps {
  className?: string;
  children?: React.ReactNode;
}

export function ScrollingPage({ children, className }: ScrollingPageProps) {

  return (
    <div className={`safe101-scrolling-page ${className}`} style={{ overflow: 'scroll', scrollbarWidth: 'none' }}>
      {children}
    </div>
  );
}

