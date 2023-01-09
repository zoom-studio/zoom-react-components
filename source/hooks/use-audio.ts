import { AUDIOS } from '../constants/audios'

export namespace UseAudioNS {
  export type DefaultAudios = keyof typeof AUDIOS
  export const Audios = <DefaultAudios[]>Object.keys(AUDIOS)
  export type Audios = DefaultAudios | (string & {})
}

export const useAudio = () => {
  const createAudio = (audioName: UseAudioNS.Audios): HTMLAudioElement => {
    return new Audio(AUDIOS[<UseAudioNS.DefaultAudios>audioName] ?? audioName)
  }

  const playAudio = async (audioName: UseAudioNS.Audios): Promise<void> => {
    return await createAudio(audioName).play()
  }

  return { playAudio }
}
