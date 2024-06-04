import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Home from '../../../utils/img/home.png';
import style from './breadcrumbs.module.css';


function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function ActiveLastBreadcrumb() {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
      <Link underline="hover" color="text.primary" href="/">
      <img className={style['breadcrumbs-arrow']} src={Home} alt="Seta"/>
        </Link>
        <Link underline="hover" color="text.primary" href="/">
        page
        </Link>
        <Link
          underline="hover"
          color="text.primary"
          href="/material-ui/getting-started/installation/"
        >
          page
        </Link>
        <Link
          underline="hover"
          color="text.primary"
          href="/material-ui/react-breadcrumbs/"
          aria-current="page"
        >
          page
        </Link>
      </Breadcrumbs>
    </div>
  );
}
