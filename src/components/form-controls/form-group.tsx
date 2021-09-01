import React, { useCallback, useEffect, useState } from 'react';
import { pubSubService } from '../../pubsub';
import './form-group.scss';

interface ProfileContextProviderProps {
  className?: string;
  children?: React.ReactNode;
}

export function FormGroup({ children, className }: ProfileContextProviderProps) {

  return (
    <div className={`safe101-form-group ${className}`}>
      {children}
    </div>
  );
}

