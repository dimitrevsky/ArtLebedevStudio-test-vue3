<script setup lang="ts"></script>

<template>
  <header class="header">
    <div class="header__logo">
      <h1 class="header__logo_text">Тестовое для Artlebedev, cделал А. Абдуллаев</h1>
    </div>

    <div class="header__nav">
      <nav class="header__nav_wrapper">
        <ul class="header__nav_list">
          <li class="header__nav_item">
            <NuxtLink to="/" active-class="nav__item--active"> Само тестовое </NuxtLink>
          </li>
          <li class="header__nav_item">
            <NuxtLink to="/about" active-class="nav__item--active"> О тестовом </NuxtLink>
          </li>
          <li class="header__nav_item">
            <NuxtLink to="https://abdullaev-portfolio.vercel.app/" target="_blank" active-class="nav__item--active">
              Портфолио
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: var(--supporting-color);
  }
}

.header__logo {
  .header__logo_text {
    font-family: Oswald, sans-serif;
    font-weight: 300;
    font-size: var(--font-size-title);
  }
}

.header__nav_list {
  display: flex;
  list-style: none;
  transition: color 0.3s ease;

  .header__nav_item {
    position: relative;
    padding: 8px 12px;
    padding-bottom: 10px;
    font-size: var(--font-size-title-small);
    cursor: pointer;

    &::before {
      content: "";
      display: block;
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 0;
      transition: height 0.4s ease-out;
      background-color: var(--accent-color);
      will-change: height;
      z-index: -1;
    }

    &:hover::before {
      height: 100%;
    }

    &:hover {
      color: #000;
    }

    .nav__item--active {
      &::after {
        content: "";
        display: block;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 4px;
        background-color: var(--supporting-color);
        transition: height 0.1s ease-out;
      }
    }
  }
}

@media (max-width: 1100px) {
  .header__logo {
    display: none;
  }

  .header {
    display: flex;
    justify-content: center;
  }
}
</style>
