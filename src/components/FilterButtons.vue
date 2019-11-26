<template>
  <div class="panel panel-default cd margin-top-20">
    <div class="panel-body min-height-210">
      <div id="filter-buttons">
        <div class="filter-buttons">
          <div class="filter-buttons_description">
            <span class="fs12">
              ¡Incorpore a sus búsqueda tantos filtros como quiera, dentro de nuestras múltiples posibilidades!
            </span>
          </div>
          <div class="filter-btns">
            <a 
            v-for="(filter, key) in filters" :key="key"
            href="#" 
            class="btn btn-default"
            v-scroll-to="{
                el: `#${filter.slug}`,
                offset: -205,
                onDone: onDone
            }"><span>{{ filter.name }}</span></a>
          </div>
        </div>
        <filter-actions-top></filter-actions-top>
      </div>
    </div>
  </div>
</template>

<script>
  import { handleScroll, howAnimation } from './../utils'
  import { mapGetters } from 'vuex'
  import $ from 'jquery'
  export default {
    name: 'filter-buttons',
    data() {
      return {}
    },
    computed: {
      ...mapGetters({
        applied_filters: 'filters/applied_filters',
        filters: 'filters/filters',
      }),
    },
    mounted() {
      window.addEventListener('scroll', handleScroll); 
    },
    watch: {
      applied_filters: function (newAppliedFilters) {
        $('.filter-btns a').removeClass('active')
        newAppliedFilters.forEach((filter) => {
          this.activeFilter(filter)
        })
      }
    },
    destroyed () {
      window.removeEventListener('scroll', handleScroll);
    },
    methods: {
      onDone (element) {
        howAnimation(element)
      },
      activeFilter(filter) {
        let links = document.querySelectorAll('.filter-btns a')
        links.forEach((item) => {
          if(item.textContent.search(filter) !== -1) {
            item.classList.add('active')
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.filter-buttons {
  display: grid;
  grid-template-columns: 20% 80%;
}

.filter-buttons .filter-buttons_description {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 8px;
  border: 2px solid #ffffff;
}

.filter-buttons .filter-btns {
  transition:all 1s;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.filter-buttons .filter-btns a {
  background-color: #dddddd;
  color: #555;
  font-weight: bold;
  border-radius: 0;
  border: 2px solid #ffffff;
  font-size: 13px;
  display: flex;
  white-space: pre-wrap!important;
  justify-content: center;
  align-items: center;

  box-sizing: inherit;
  transition-property: all;
  transition-duration: 0.6s;
  transition-timing-function: ease;
  overflow: hidden;
  position: relative;

  span {
    z-index: 20;
  }
  
  &::after {
    background: #fff;
    content: "";
    height: 155px;
    left: -75px;
    opacity: 0.2;
    position: absolute;
    top: -50px;
    transform: rotate(35deg);
    transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
    width: 50px;
    z-index: 0;
  }
  
  &:hover {
    border-color: #aaa;
    color: #333;
    
    &:after {
      left: 120%;
      transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
    }
  }

}

.filter-buttons .filter-btns a.active {
  border-color: #aaa;
  color: #333;
  &:after {
    left: 120%;
    transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
  }
}



.min-height-210 {
  min-height: 185px;
}

#filter-buttons.is-fixed {
  position: fixed;
  left: 0;
  top: 96px;
  width: 100%;
  padding-bottom: 6px;
  z-index: 1;
  background: #ffffff;
  -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  box-shadow: 0 -2px 11px 0px rgba(0, 0, 0, 0.5);

  .panel-body {
    padding: 0;
  }

  .filter-buttons {
    grid-template-columns: 100%;

    .filter-buttons_description {
      display: none;
    }
  }

  .filter-btns  {
    margin-bottom: 6px;
    background: #ffffff;
    transition:all 1s;
    display: flex;
    justify-content: space-between;
    a {
      font-size: 11px;
      padding: 0;
      flex: 1;
    }
  }

  .padding-to-20 {
    padding: 0;
    margin: 0;
    display: flex;
  }

}

@media (max-width: 767px){
  .filter-btns.is-fixed  {
    top: 42px;
    overflow-x: scroll;
  }  
}

@media (max-width: 950px) {
  .filter-buttons {
    
    grid-template-columns: 100%;
    
    .filter-btns{
      grid-template-columns: repeat(4, 1fr);
    }

  }
}

@media (max-width: 550px) {
  .filter-buttons {
    .filter-btns{
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

@media (max-width: 350px) {
  .filter-buttons {
    .filter-btns{
      grid-template-columns: repeat(1, 1fr);
    }
  }
}

</style>
