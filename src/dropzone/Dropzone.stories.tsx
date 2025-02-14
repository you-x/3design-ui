import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import 'twin.macro'
import { Dropzone } from './Dropzone'

export default {
  title: 'Atom/Dropzone',
  component: Dropzone,
  decorators: [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (Story: any) => (
      <div tw="mt-10 flex flex-col h-screen w-screen gap-4">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    multiple: { control: 'boolean' },
    message: { control: 'text' },
  },
} as Meta

export const Basic = ({
  multiple,
  message,
}: {
  multiple: boolean
  message: string
}): JSX.Element => {
  const [filesState, setFilesState] = React.useState<File[]>([])

  const onDrop = React.useCallback(
    (files: File[]) => {
      if (!multiple && filesState.length > 0) {
        return
      }
      setFilesState((prevState) => [...prevState, ...files])
    },
    [multiple, filesState.length]
  )

  const onRemove = React.useCallback(
    (file: File) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      setFilesState((prevState) => {
        const newState = [...prevState]
        newState.splice(prevState.indexOf(file), 1)
        return [...newState]
      })
    },
    []
  )

  return (
    <Dropzone
      multiple={multiple}
      message={message}
      onDrop={onDrop}
      onRemove={onRemove}
      files={filesState}
    />
  )
}
