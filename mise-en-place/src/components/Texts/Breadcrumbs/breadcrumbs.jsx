import * as React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Home from '../../../utils/img/home.png';
import style from './breadcrumbs.module.css';

export default function ActiveLastBreadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="text.primary" component={RouterLink} to="/">
          <img className={style['breadcrumbs-arrow']} src={Home} alt="Seta" />
        </Link>
        {pathnames.length === 0 || pathnames[0] === "dashboard" ? (
          <Link underline="hover" color="text.primary" component={RouterLink} to="/dashboard">Home</Link>
        ) : (
          <Link underline="hover" color="text.primary" component={RouterLink} to="/dashboard">Home</Link>
        )}
        {pathnames.map((value, index) => {
          if (value === "dashboard") return null; // Evitar duplicação da Home

          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;

          return last ? (
            <Link
              key={to}
              underline="hover"
              color="text.primary"
              aria-current="page"
            >
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </Link>
          ) : (
            <Link
              key={to}
              underline="hover"
              color="text.primary"
              component={RouterLink}
              to={to}
            >
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>  
  );
}
