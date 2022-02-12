import React from 'react'
import IconsFeather from 'react-native-vector-icons/Feather'
import {
	ContainerListTask,
	ContentListTask,
	TextTask,
	ContainerButtons,
	ContainerButtonEdit,
	ContainerButtonDelete,
	ButtonIconEdit,
	ButtonIconDelete
} from './styles'

export default function TaskList({ data, deleteItem, editItem }) {
  return (
    <ContainerListTask>

      <ContentListTask>
        <TextTask>{data.nome}</TextTask>
      </ContentListTask>

      <ContainerButtons>
        <ContainerButtonEdit>
          <ButtonIconEdit onPress={() => editItem(data)}>
            <IconsFeather name='edit' color='#0a9396' size={26} />
          </ButtonIconEdit>
      	</ContainerButtonEdit>
      	<ContainerButtonDelete>
        	<ButtonIconDelete onPress={() => deleteItem(data.key)}>
          	<IconsFeather name='trash-2' color='#ff0000' size={26} />
        	</ButtonIconDelete>
      	</ContainerButtonDelete>
      </ContainerButtons>

    </ContainerListTask>
  )
}
