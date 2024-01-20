import styled from 'styled-components'
import { ITask, Statuses } from '../types'
import { CheckIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Input, Radio, RadioGroup, Stack} from '@chakra-ui/react'
import { store } from '../store/store'
import { useState } from 'react'
export const Task = (props: ITask) => {
    const [isEditable, setIsEditable] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)
    const [description, setDescription] = useState<string | null>(props.description)
    const [status, setStatus] = useState<Statuses | string>(props.status)
    const handleUpdate = async () => {
        await store.updateTask({id: props.id, title, description, status, userId: props.userId})
    }   
    return(
        <Wrapper>
            <StyledAccordion allowToggle>
                <AccordionItem style={{border: 'none'}}>
                    <AccordionItemTop style={{padding: '5px 15px'}}>
                        {isEditable 
                        ? <Input color='#ffffff' variant='flushed' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} maxLength={40}/>
                        :   <AccordionButton style={{padding: '0 15px 0 0'}}>
                                <Box as="span" flex='1' textAlign='left'>
                                    <Title>{title}</Title>
                                </Box>
                            <AccordionIcon boxSize={8} color='white' />
                        </AccordionButton>}
                        {isEditable 
                        ? <CheckIcon style={{marginRight: '15px', cursor: 'pointer'}} onClick={() => {setIsEditable(false); ; handleUpdate()}} boxSize={6} color='white'/> 
                        : <EditIcon onClick={() => setIsEditable(true)} style={{marginRight: '15px', cursor: 'pointer'}} boxSize={6} color='white'/>}
                        <DeleteIcon onClick={() => store.deleteTask(props.id || 0)} style={{cursor: 'pointer'}} boxSize={6} color='white'/>
                    </AccordionItemTop>
                    <AccordionPanel pb={4}>
                        {isEditable 
                        ? <Input color='#ffffff' variant='flushed' placeholder='Description' value={description || ''} onChange={(e) => setDescription(e.target.value)}/>
                        : <Text>{description}</Text>}
                        {isEditable 
                        ? <StyledRadioGroup onChange={setStatus} value={status}>
                            <Stack direction='row'>
                                <Radio value={Statuses.PENDING}><Text>Pending</Text></Radio>
                                <Radio value={Statuses.IN_PROGRESS}><Text>In progress</Text></Radio>
                                <Radio value={Statuses.COMPLETED}><Text>Completed</Text></Radio>
                            </Stack>
                        </StyledRadioGroup>
                        : <Text>Status: {status}</Text>}
                    </AccordionPanel>
                </AccordionItem>
            </StyledAccordion>
        </Wrapper>
    )
}

const StyledRadioGroup = styled(RadioGroup)`
    margin-top: 15px;
`

const StyledAccordion = styled(Accordion)`
    width: 100%;
`
const AccordionItemTop = styled.div`
    display: flex;
    align-items: center;
`
const Title = styled.p`
    color: #ffffff;
    height: min-content;
`
export const Text = styled.p`
    color: #ffffff;
`
const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #1f2227;
    margin-top: 10px;
    padding: 10px 10px;
    width: 100%;
    border-radius: 10px;
`