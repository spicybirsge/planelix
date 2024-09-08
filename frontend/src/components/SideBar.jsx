'use client'
import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuGroup,

} from '@chakra-ui/react'
import {
  FiHome,
  FiTrendingUp,
  FiPlus,

  FiMenu,
  FiBell,
  FiChevronDown,
  FiBookmark,
  FiUser,
  FiSearch,
  FiHeart
} from 'react-icons/fi'




function SideBar(props) {
  const LinkItems = [
    { name: 'Home', icon: FiHome, active: props.active === "home" ? true : false, link: '/' },
    { name: 'Search', icon: FiSearch, active: props.active === "search" ? true : false, link: '/search' },
    { name: 'Trending', icon: FiTrendingUp, active: props.active === "trending" ? true : false, link: '/trending' },
    ,



  ]

  if (props.loggedIn) {
    LinkItems.push(
      { name: 'Liked', icon: FiHeart, active: props.active === "liked" ? true : false, link: '/liked' },
      { name: 'Saved', icon: FiBookmark, active: props.active === "saved" ? true : false, link: '/saved' },
      { name: 'New Post', icon: FiPlus, active: props.active === "new" ? true : false, link: `/new` },
      { name: 'Profile', icon: FiUser, active: props.active === "profile" ? true : false, link: `/@${props.user?.username}` },



    )
  }

  const SidebarContent = ({ onClose, ...rest }) => {
    return (
      <Box
        transition="3s ease"
        bg={useColorModeValue('white', 'gray.900')}
        borderRight="1px"
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        w={{ base: 'full', md: 60 }}
        pos="fixed"
        h="full"
        {...rest}>
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            Planelix
          </Text>
          <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
        </Flex>
        {LinkItems.map((link) => (
          <><Link key={link.name} as={NextLink} href={link.link}>
            <NavItem key={link.name} icon={link.icon} active={link.active}>

              {link.name}

            </NavItem></Link>
            <div style={{ marginBottom: '8px' }}></div>
          </>
        ))}
      </Box>
    )
  }

  const NavItem = ({ icon, active, children, ...rest }) => {
    return (
      <Box

        style={{ textDecoration: 'none' }}
        _focus={{ boxShadow: 'none' }}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          bg={active ? '#edf2f7' : 'transparent'}
          color={active ? 'black' : 'inherit'}
          _hover={{
            bg: '#edf2f7',
            color: 'black',
          }}
          {...rest}>
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: 'black',
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Box>
    )
  }

  const MobileNav = ({ onOpen, ...rest }) => {
    return (
      <Flex
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 4 }}
        height="20"
        alignItems="center"
        bg={useColorModeValue('white', 'gray.900')}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
        justifyContent={{ base: 'space-between', md: 'flex-end' }}
        {...rest}>
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
        />

        <Text
          display={{ base: 'flex', md: 'none' }}
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold">
          Planelix
        </Text>

        <HStack spacing={{ base: '0', md: '6' }}>
          {props.loggedIn ? (
            <Link as={NextLink} href='/notifications'><IconButton size="lg" variant="ghost" icon={<FiBell />} /></Link>
          ) : (
            <></>
          )}
          <Flex alignItems={'center'}>
            {props.loggedIn ? (
              <Menu>
                <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                  <HStack>
                    <Avatar size={'sm'} name={props?.user?.name} src={props.user.avatar} />
                    <VStack
                      display={{ base: 'none', md: 'flex' }}
                      alignItems="flex-start"
                      spacing="1px"
                      ml="2">
                      <Text fontSize="sm">{props.user?.name || 'unknown'}</Text>
                    </VStack>
                    <Box display={{ base: 'none', md: 'flex' }}>
                      <FiChevronDown />
                    </Box>
                  </HStack>
                </MenuButton>
                <MenuList
                  bg={useColorModeValue('white', 'gray.900')}
                  borderColor={useColorModeValue('gray.200', 'gray.700')}>
                  <MenuGroup title={'Logged in as'}>
                    <MenuItem>{props.user.email || 'unknown'}</MenuItem>
                  </MenuGroup>

                  <MenuGroup title={'Account'}>
                    <Link as={NextLink} href={"/settings"}><MenuItem>Settings</MenuItem></Link>
                    <Link as={NextLink} href={`/@${props.user.username}`}> <MenuItem>Profile</MenuItem></Link>
                    <Link as={NextLink} href={"/logout"}><MenuItem>Logout</MenuItem></Link>
                  </MenuGroup>
                </MenuList>
              </Menu>
            ) : (
              <>
                <Menu>
                  <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                    <HStack>
                      <Avatar size={'sm'} name={props?.user?.name} />
                      <VStack
                        display={{ base: 'none', md: 'flex' }}
                        alignItems="flex-start"
                        spacing="1px"
                        ml="2">
                        <Text fontSize="sm">Login or Register</Text>
                      </VStack>
                      <Box display={{ base: 'none', md: 'flex' }}>
                        <FiChevronDown />
                      </Box>
                    </HStack>
                  </MenuButton>
                  <MenuList
                    bg={useColorModeValue('white', 'gray.900')}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}>
                    <Link as={NextLink} href={"/login"}> <MenuItem>Login</MenuItem></Link>
                    <Link as={NextLink} href={"/register"}> <MenuItem>Register</MenuItem></Link>
                  </MenuList>
                </Menu>
              </>
            )}
          </Flex>
        </HStack>
      </Flex>
    )
  }

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {props.element}
      </Box>
    </Box>
  )
}

export default SideBar