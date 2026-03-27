/**
 * Paylaşılan sabit veri — tek kaynak doğruluğu
 * FeedSection, CreatePostModal ve diğer bileşenler buradan import eder.
 */

export const CLUB_LIST = [
  'Developer Student Community',
  'ESports Society',
  'Müzik & Sahne Sanatları',
  'Girişimcilik Kulübü',
  'Fotoğrafçılık Topluluğu',
  'Bilim & Araştırma Kulübü',
] as const

export const TAG_LIST = [
  'Atölye',
  'Etkinlik',
  'Turnuva',
  'Duyuru',
  'Haber',
  'Fotoğraf',
] as const

export type FeedFilter = 'all' | 'events' | 'announcements'

export const TAG_TO_TYPE: Record<string, FeedFilter> = {
  Atölye:  'events',
  Etkinlik:'events',
  Turnuva: 'events',
  Duyuru:  'announcements',
  Haber:   'announcements',
  Fotoğraf:'all',
}
