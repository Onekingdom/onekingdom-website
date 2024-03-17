import React from 'react'
import { useAppDispatch, useAppSelector } from './redux';

export default function useEditor() {
  const state = useAppSelector((state) => state.pageEditor);
  const dispatch = useAppDispatch();


  return { state, dispatch };

}
