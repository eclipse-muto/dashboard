import process from 'process'
import buffer from 'buffer'

(window as any).Buffer = buffer.Buffer;
(window as any).process = process;

export {};