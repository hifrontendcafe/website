import clsx from 'clsx';
import { Lexend_Deca, Rubik } from 'next/font/google';

const lexend = Lexend_Deca({
  subsets: ['latin'],
  variable: '--font-lexend',
  display: 'swap',
});

const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
  display: 'swap',
});
const fontVariables = clsx(rubik.variable, lexend.variable);

export default fontVariables;
