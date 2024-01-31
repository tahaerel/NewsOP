export type TaskType = 'improve' | 'expand' | 'shorten' | 'continue';
export type TaskTone = 'causal' | 'semicasual' | 'professional' | 'concise' | 'charismatic';
import { IconType } from "react-icons";
import { FiArrowRight, FiMinus, FiPlus, FiZap, FiFeather, FiCloud, FiShuffle, FiMessageSquare, FiGrid } from "react-icons/fi"

type Role = "assistant" | "user";
export interface Message {
  role: Role;
  content: string;
}
export interface ChatHistory {
  id: string;
  task: TaskType;
  tone: TaskTone;
  selection: string;
  messages: Message[];
  modelId: string;
  temperature: number;
}


export interface Doc {
  id: string;
  title: string;
  prompt: string;
  data: string;
  history: ChatHistory[];
  createdAt: number;
  updatedAt: number;
}

export interface Action {
  id: string;
  name: string;
  prompt: string;
  // icon: IconType;
}

export interface Setting {
  modelId: string;
  temperature: number;
  apiKey: string;
  globalPrompt: string;
  actionPrompts: Action[];
  createdAt: number;
  updatedAt: number;
}

export const ActionIconMap = {
  "improve": FiZap,
  "expand": FiPlus,
  "shorten": FiMinus,
  "continue": FiArrowRight,
  "counterargument": FiShuffle,
  "example": FiFeather,
  "brainstorm": FiCloud,
  "chat": FiMessageSquare,
  "custom": FiGrid
}

export const DefaultActions: Action[] = [
  {
      "id": "improve",
      "name": "Daha İyi Metin",
      // "icon": FiZap,
      "prompt": 'Yazma kalitesini artırmak için aşağıdaki metni yeniden yazın. Bu, yazım ve dilbilgisini düzeltmeyi, cümleleri daha net ve özlü hale getirmeyi, art arda gelen cümleleri bölmeyi ve tekrarı azaltmayı içerir. Kelimeleri değiştirirken revize edilen metin orijinalinden daha karmaşık veya zor olmamalıdır. Metin tırnak içeriyorsa tırnak içindeki metin aynen tekrarlanmalıdır. Metnin anlamı değiştirilmemeli ve metindeki başlıklar, madde işaretleri veya onay kutuları gibi işaretleme biçimlendirmeleri kaldırılmamalıdır. Aşırı resmi bir dil kullanılmamalıdır.'
  },
  {
      "id": "expand",
      "name": "Metni Uzat",
      // "icon": FiPlus,
      "prompt": 'Aşağıdaki metni, ana fikirleri korurken daha uzun olacak şekilde yeniden yazın.'
  },
  {
      "id": "shorten",
      "name": "Metni Kısalt",
      // "icon": FiMinus,
      "prompt": 'Aşağıdaki metni ana fikirleri koruyarak mümkün olduğu kadar kısa ve öz bir şekilde yeniden yazın.'
  },
  {
      "id": "continue",
      "name": "Yazmaya Devam Et",
      // "icon": FiArrowRight,
      "prompt": "Aşağıdaki metni herhangi bir giriş veya giriş yapmadan yazmaya devam edin."
  },
  {
      "id": "counterargument",
      "name": "Karşı Argüman",
      // "icon": FiShuffle,
      "prompt": "Aşağıdaki metin için bir karşı argüman belirtin."
  },
  {
      "id": "example",
      "name": "Örnek Ver",
      // "icon": FiFeather,
      "prompt": "Aşağıdaki metin için bir örnek veriniz."
  },
  {
      "id": "brainstorm",
      "name": "Beyin Fırtınası",
      // "icon": FiCloud,
      "prompt": "Aşağıdaki metin için beyin fırtınası yapın."
  },
  {
      "id": "chat",
      "name": "Genel Mesajlaşma",
      // "icon": FiMessageSquare,
      "prompt": "Kullanıcının talimatlarını dikkatle izleyin."
  }
]

export const DefaultSetting: Setting = {
  modelId: 'ft:gpt-3.5-turbo-1106:personal::8n2oCykT',
  temperature: 0.5,
  apiKey: '',
  globalPrompt: 'Sen bir haber editörü asistanısın. Haber editörlerinin haber yazmasına yardımcı oluyorsun. Tüm metinlerinde habercilik standartlarına uyuyorsun.Kullanıcının talimatlarını dikkatlice izleyin.',
  actionPrompts: DefaultActions
}

// export const TasksMap = new Map(
//   Tasks.map(task => {
//     return [task.name, task];
//   }),
// );
