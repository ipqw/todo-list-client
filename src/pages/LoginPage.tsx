import { observer } from 'mobx-react'
import { styled } from 'styled-components'
import { ContentWrapper, Footer, Link, Title, Wrapper } from './TodoPage'
import { Avatar, Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react'
import { ArrowRightIcon } from '@chakra-ui/icons'
import { useEffect, useState } from 'react'
import { store } from '../store/store'
import { useNavigate } from 'react-router-dom'
export const LoginPage = observer(() => {
    const [username, setUsername] = useState<string>('')
    const [error, setError] = useState<string>('')
    const navigate = useNavigate()
    useEffect(() => {
        store.setUser(null)
        localStorage.clear()
    }, [])
    const handleLogin = async () => {
        localStorage.setItem('username', username)
        const response = await store.downloadUserData()
        if(response){
            navigate('/', {replace: true})
        }
        else{
            setError('User was not found')
        }
    }
    return (
        <StyledWrapper style={{minHeight: '250px'}}>
            <ContentWrapper style={{minHeight: '250px'}}>
                <Title>Login</Title>
                <StyledInputGroup>
                    <InputLeftElement pointerEvents='none' color='gray.300' fontSize='1.2em'>
                        <Avatar size='xs' bg='teal.500' />
                    </InputLeftElement>
                    <Input color='white' value={username} onChange={(e) => setUsername(e.target.value)} variant='outline' placeholder='Username' />
                    <InputRightElement color='gray.300' fontSize='1.2em'>
                        <StyledArrowRightIcon onClick={handleLogin} />
                    </InputRightElement>
                </StyledInputGroup>
                <Error>{error}</Error>
            </ContentWrapper>
            <Footer>Don't have an account? <Link href='/reg'>Sign up</Link></Footer>
        </StyledWrapper>
    )
})
export const StyledWrapper = styled(Wrapper)`
    min-height: 250px;
`

const StyledArrowRightIcon = styled(ArrowRightIcon)`
    cursor: pointer;
`
const Error = styled.p`
    color: #ffffff;
    padding-top: 30px;
`

const StyledInputGroup = styled(InputGroup)`
    margin-top: 30px;
`