/**
 * Arama sonlandırma için gereken parametreler.
 */
export interface EndCallDto {
  /**
   * Çağrı başladığında response içerisinde dönen unique_id değeri
   * Örnek: sip-xxxxxxxxxx.xxxxxx
   */
  uniqueId: string;

  /**
   * Çağrı başlatırken gönderdiğiniz crmid değeri
   */
  crmId: Number;
}
