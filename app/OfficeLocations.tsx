import { officeLocations } from './content';
import styles from './OfficeLocations.module.css';

export function OfficeLocations({ compact = false }: { compact?: boolean }) {
  return <section className={`${styles.root}${compact ? ` ${styles.compact}` : ''}`} aria-labelledby={compact ? 'footer-office-title' : 'office-location-title'}>
    <div className={styles.heading}><div><p className={styles.eyebrow}>{compact ? 'Văn phòng hỗ trợ' : 'Văn phòng Khang Vuong Booking'}</p><h2 id={compact ? 'footer-office-title' : 'office-location-title'}>{compact ? 'Kết nối tại Hà Nội và TP. Hồ Chí Minh' : 'Địa chỉ, liên hệ và Google Maps'}</h2></div></div>
    <div className={styles.grid}>{officeLocations.map((office) => <section className={styles.card} key={office.city}><div className={styles.city}><span className={styles.pin} aria-hidden="true">⌖</span><h3>{office.city}</h3></div><div className={styles.addresses}>{office.addresses.map((address) => <a key={address.label} href={address.mapUrl} target="_blank" rel="noopener noreferrer">{address.label}<small className={styles.mapLabel}>Mở Google Maps ↗</small></a>)}</div><a className={styles.phone} href={`tel:${office.phoneTel}`}>Gọi {office.phone}</a></section>)}</div>
  </section>;
}
