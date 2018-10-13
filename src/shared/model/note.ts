export default interface Note {
  id: number;
  uuid: string;
  userId: number;
  encryptionType: number;
  content: string;
  dateCreated: string;
  dateModified: string;
  dateSync: string;
}
