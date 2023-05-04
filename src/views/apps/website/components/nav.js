import React, { Component } from 'react'
import {
  Container,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from 'reactstrap'
class MobileMenu extends Component {
  state = { isOpen: false }

  toggle = () => this.setState({ isOpen: !this.state.isOpen })

  render() {
    return (
      <div className="mobile-wrapper">
        <div className="mobile-menu">
          <Container className="pos-ref">
            <i
              className="fas fa-times mobile-menu__close-bt"
              onClick={this.props.hideNav}
            />
          </Container>
        </div>
        <Nav vertical className={'mobile-nav'}>
          <NavItem className="nav-item-m">
            <NavLink>home</NavLink>
          </NavItem>
          <NavItem className="nav-item-m">
            <NavLink>about</NavLink>
          </NavItem>
          <NavItem className="nav-item-m">
            <NavLink>features</NavLink>
          </NavItem>
          <NavItem className="nav-item-m">
            <NavLink>screenshots</NavLink>
          </NavItem>
          <NavItem className="nav-item-m">
            <NavLink>team</NavLink>
          </NavItem>
          <NavItem className="nav-item-m">
            <NavLink>pricing</NavLink>
          </NavItem>
          <NavItem>
            <Dropdown isOpen={this.state.isOpen} toggle={this.toggle}>
              <DropdownToggle className="drop-item" caret>
                Dropdown
              </DropdownToggle>
              <DropdownMenu className="drop-menu">
                <DropdownItem>dropdown-1</DropdownItem>
                <DropdownItem>dropdown-2</DropdownItem>
                <DropdownItem>dropdown-3</DropdownItem>
                <DropdownItem>dropdown-4</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavItem>
          <NavItem className="nav-item-m">
            <NavLink>blog</NavLink>
          </NavItem>
          <NavItem className="nav-item-m">
            <NavLink>contact</NavLink>
          </NavItem>
        </Nav>
        <style jsx>
          {`
            .mobile-wrapper {
              display: none;
              
            }
            .mobile-menu {
              display: none;
              z-index: 2;
              position: fixed;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              background-color: hsla(0, 9.1%, 2.2%, 0.7);
            }
            .mobile-menu .mobile-menu__close-bt {
              position: absolute;
              font-size: 1.6rem;
              color: white;
              right: 1.3rem;
              top: 1rem;
              cursor: pointer;
              z-index: 1;
            }

            .pos-ref {
              position: relative;
            }

            .mobile-nav {
              position: fixed;
              left: 0;
              width: 250px;
              padding-top: 1.6rem;
              align-items: strech;
              background-color: hsl(216, 13%, 15%);
              transition: all 1s;
              transform: translate(-100%);
              height: 100%;
              z-index: 2;
            }
            .nav-item-m {
              cursor: pointer;
              color: white;
              font-size: 14px;
              text-transform: capitalize;
            }
            .nav-item-m a {
              width: 100%;
              text-align: left;
            }
            .drop-menu {
              width: 100%;
            }
            .drop-item {
              width: 100%;
              text-align: left;
              padding: 0.5rem 1rem;
              color: white;
              background: inherit;
              border: none;
              font-size: 14px;
            }
            .drop-item:hover {
              background-color: transparent;
            }
            .drop-item:after {
              position: absolute;
              right: 1rem;
              top: 1rem;
            }
            .drop-menu  {
              display: block;
            }
          `}
        </style>
      </div>
    )
  }
}

export default class extends Component {
  dropNav = React.createRef()

  hamButton = React.createRef()

  over = () => {
    this.dropNav.current.style.display = 'block'
    this.opacityTiemOut = setTimeout(() => {
      this.dropNav.current.style.opacity = '1'
    })
  }
  out = () => {
    this.dropNav.current.style.transition = 'all .5s 1s'
    this.dropNav.current.style.opacity = '0'
  }
  onHide = () => {
    if (this.dropNav.current.style.opacity === '1') return
    this.dropNav.current.style.display = 'none'
    this.dropNav.current.style.transition = 'all .5s'
  }

  hideNav = e => {
    document.body.style.overflow = 'visible'
    this.mobileMenu.style.display = 'none'
    this.hamButton.style.display = ''
    this.mobileNav.style.transform = `translateX(-100%)`
  }

  showNav = e => {
    e.preventDefault()
    document.body.style.overflow = 'hidden'
    this.hamButton.style.display = 'none'
    this.menuWrapper.style.display = 'block'
    this.mobileMenu.style.display = 'block'
    setTimeout(() => {
      this.mobileNav.style.transform = 'translateX(0px)'
    }, 200)
  }
  fixedNav() {
    const nav = document.querySelector('.navi-menu')
    const navHeigth = parseInt(window.getComputedStyle(nav).height, 10)
    const scrollEl = document.scrollingElement
    if (scrollEl.scrollTop > navHeigth) {
      nav.style.position = 'fixed'
      nav.classList.add('scroll-nav')
    } else {
      nav.style.position = 'static'
      nav.classList.remove('scroll-nav')
    }
  }
  componentDidMount() {
    window.addEventListener('scroll', this.fixedNav)
    this.menuWrapper = document.querySelector('.mobile-wrapper')
    this.mobileMenu = document.querySelector('.mobile-menu')
    this.mobileNav = document.querySelector('.mobile-nav')
    this.hamButton = document.querySelector('.ham')
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.fixedNav)
  }
  render() {
    return (
      <div className="navi-menu">
        <Container>
          <MobileMenu hideNav={this.hideNav} />

          <Nav className="nav-n">
            <NavItem className="nav-item-n logo">
              <NavLink href="#">eStarup</NavLink>
            </NavItem>
            <NavItem className="nav-item-n ham" onClick={this.showNav}>
              <NavLink href="">
                <i class="fas fa-bars" />
              </NavLink>
            </NavItem>
            <NavItem className="nav-item-n">
              <NavLink href="#">home</NavLink>
            </NavItem>
            <NavItem className="nav-item-n">
              <NavLink href="#">about</NavLink>
            </NavItem>
            <NavItem className="nav-item-n">
              <NavLink href="#">features</NavLink>
            </NavItem>
            <NavItem className="nav-item-n">
              <NavLink href="#">screenshots</NavLink>
            </NavItem>
            <NavItem className="nav-item-n">
              <NavLink href="#">team</NavLink>
            </NavItem>
            <NavItem className="nav-item-n">
              <NavLink href="/login">Iniciar Sesion</NavLink>
            </NavItem>
            <div
              className="drop"
              onMouseOver={this.over}
              onMouseOut={this.out}
              onTransitionEnd={this.onHide}
            >
              <NavItem>
                <NavLink href="#" className="nav-item-n caret">
                  dropdown
              </NavLink>
              </NavItem>
              <div className="drop__item" ref={this.dropNav}>
                <Nav vertical>
                  <NavItem className="nav-item-n">
                    <NavLink href="#">dropdown-1</NavLink>
                  </NavItem>
                  <NavItem className="nav-item-n">
                    <NavLink href="#">dropdown-2</NavLink>
                  </NavItem>
                  <NavItem className="nav-item-n">
                    <NavLink href="#">dropdown-3</NavLink>
                  </NavItem>
                  <NavItem className="nav-item-n">
                    <NavLink href="#">dropdown-4</NavLink>
                  </NavItem>
                </Nav>
              </div>
            </div>

            <NavItem className="nav-item-n">
              <NavLink href="#">Blog</NavLink>
            </NavItem>
            <NavItem className="nav-item-n">
              <NavLink href="#">Contact</NavLink>
            </NavItem>
          </Nav>
        </Container>
        <style jsx>{`
          .scroll-nav {
            background: white;
            width: 100%;
            z-index: 4;
            box-shadow: #e1dfdf 1px 1px 11px;
          }
          .nav-n {
            align-items: center;
          }
          .nav-item-n {
            display: none;
            font-size: 14px;
          }
          .nav-item-n:not(.logo) {
            text-transform: capitalize;
          }
          .nav-item-n a {
            padding: 0.5rem 0.6rem;
            color: inherit;
          }
          .nav-item-n:not(.ham):not(.logo):hover {
            color: var(--brand-color);
          }
          .logo {
            font-family: 'Philosopher', sans-serif;
            font-size: 2em;
          }
          .logo:first-letter {
            color: var(--brand-color);
          }
          @media (min-width: 1024px) {
            .nav-item-n {
              display: block;
            }
          }
          .logo,
          .ham {
            display: block;
          }
          .ham {
            margin-left: auto;
            font-size: 1.4rem;
          }
          @media (min-width: 1024px) {
            .ham {
              display: none;
            }
            .logo {
              margin-right: auto;
            }
          }

          .drop {
            position: relative;
          }
          .drop__item {
            position: absolute;
            display: none;
            transition: all 0.5s;
            width: 200px;
            padding: 0.5rem 0;
            opacity: 0;
            box-shadow: 0px 0px 20px 0px #f1f1f1d1, 0px 0px 20px 0px #ffffff2b;
            z-index: 3;
          }
          .drop__item .nav {
            align-items: flex-start;
          }
          .drop__item a {
            padding: 0.65rem 1.3rem;
          }
          .caret:after {
            content: '';
            display: inline-block;
            vertical-align: middle;
            margin-left: 5px;
            width: 5px;
            height: 5px;
            border: none;
            border-left: 2px solid;
            border-bottom: 2px solid;
            transform: rotate(-45deg);
          }
        `}</style>
      </div>
      
        
      
    )
  }
}
