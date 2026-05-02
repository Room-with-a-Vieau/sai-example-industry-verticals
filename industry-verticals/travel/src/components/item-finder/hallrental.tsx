'use client';

import React, { useState, useMemo, JSX } from 'react';
import { Field, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { useI18n } from 'next-localization';
import { MapPin, Users, Calendar, Clock, ChevronDown, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shadcn/components/ui/dropdown-menu';
import { DatePicker } from '@/shadcn/components/ui/date-picker';

interface Fields {
  PlaceholderText?: Field<string>;
  SearchButtonText?: Field<string>;
}

interface HallRentalProps extends ComponentProps {
  fields?: Fields;
}

export const Default = ({ params, fields }: HallRentalProps): JSX.Element => {
  const { page } = useSitecore();
  const { styles, RenderingIdentifier: id } = params;
  const { t } = useI18n();
  const isPageEditing = page.mode.isEditing;
  const [selectedHall, setSelectedHall] = useState<string>('');
  const [selectedEventType, setSelectedEventType] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [guestCount, setGuestCount] = useState(1);
  const [specialRequests, setSpecialRequests] = useState('');

  // Sample unavailable dates (mimicking booked dates)
  const unavailableDates = useMemo(
    () => [
      new Date(2026, 4, 10), // May 10, 2026
      new Date(2026, 4, 17), // May 17, 2026
      new Date(2026, 4, 24), // May 24, 2026
      new Date(2026, 5, 1), // June 1, 2026
    ],
    []
  );

  const hallOptions = useMemo(
    () => [
      {
        label: t('stern_auditorium_label') || 'Stern Auditorium / Perelman Stage',
        value: 'stern-auditorium',
      },
      { label: t('zankel_hall_label') || 'Zankel Hall', value: 'zankel-hall' },
      { label: t('weill_recital_hall_label') || 'Weill Recital Hall', value: 'weill-recital-hall' },
      { label: t('rehearsal_rooms_label') || 'Rehearsal Rooms', value: 'rehearsal-rooms' },
      { label: t('green_room_label') || 'Green Room', value: 'green-room' },
      {
        label: t('rotunda_lobby_label') || 'Rotunda / Lobby / Event Space',
        value: 'rotunda-lobby',
      },
    ],
    [t]
  );

  const eventTypeOptions = useMemo(
    () => [
      { label: t('performance_label') || 'Performance', value: 'performance' },
      { label: t('reception_label') || 'Reception', value: 'reception' },
      { label: t('conference_label') || 'Conference', value: 'conference' },
      { label: t('meeting_label') || 'Meeting', value: 'meeting' },
      { label: t('private_event_label') || 'Private Event', value: 'private-event' },
    ],
    [t]
  );

  const timeOptions = useMemo(
    () => [
      { label: '9:00 AM', value: '09:00' },
      { label: '10:00 AM', value: '10:00' },
      { label: '11:00 AM', value: '11:00' },
      { label: '12:00 PM', value: '12:00' },
      { label: '1:00 PM', value: '13:00' },
      { label: '2:00 PM', value: '14:00' },
      { label: '3:00 PM', value: '15:00' },
      { label: '4:00 PM', value: '16:00' },
      { label: '5:00 PM', value: '17:00' },
      { label: '6:00 PM', value: '18:00' },
      { label: '7:00 PM', value: '19:00' },
      { label: '8:00 PM', value: '20:00' },
    ],
    []
  );

  const guestOptions = useMemo(
    () => [
      { label: '1-50', value: 50 },
      { label: '51-100', value: 100 },
      { label: '101-200', value: 200 },
      { label: '201-500', value: 500 },
      { label: '500+', value: 501 },
    ],
    []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Prototype: Log the form data
    console.log({
      selectedHall,
      selectedEventType,
      selectedDate,
      selectedTime,
      guestCount,
      specialRequests,
    });
    alert('Rental request submitted (prototype)');
  };

  if (!fields && !isPageEditing) {
    return <></>;
  }

  const FilterDropdown = ({
    options,
    selectedValue,
    onSelect,
    placeholder,
    hasIcon,
  }: {
    options: { label: string; value: string | number }[];
    selectedValue: string | number;
    onSelect: (value: string | number) => void;
    placeholder: string;
    hasIcon?: boolean;
  }) => {
    const selectedLabel = selectedValue
      ? options.find((opt) => opt.value === selectedValue)?.label
      : null;
    const displayText = selectedLabel || placeholder;
    const isPlaceholder = !selectedValue;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className={`border-border inline-flex h-9 w-full items-center justify-between gap-2 rounded-md border bg-transparent ${
              hasIcon ? 'r-4 pl-10' : 'px-4'
            } py-1 text-xs shadow-xs focus:outline-none ${
              isPlaceholder ? 'text-foreground-muted' : 'text-foreground'
            }`}
          >
            <span>{displayText}</span>
            <ChevronDown size={16} className="text-foreground-muted shrink-0" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="min-w-36">
          {options.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => onSelect(option.value)}
              className="flex items-center justify-between text-xs"
            >
              <span>{option.label}</span>
              {selectedValue === option.value && <Check size={16} className="ml-2 shrink-0" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <div className={`component hall-rental ${styles || ''}`} id={id || undefined}>
      {isPageEditing && !fields && (
        <div className="text-foreground-muted p-4 text-center">[HALL RENTAL - PROTOTYPE]</div>
      )}
      {(!isPageEditing || fields) && (
        <form onSubmit={handleSubmit} className="w-full">
          <div className="bg-background w-full max-w-full rounded-xl pt-11 pr-6 pb-11 pl-6 shadow-xl">
            {/* Input Fields Grid */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_1fr]">
              {/* Hall Selection */}
              <div className="hall-input-group">
                <label className="text-foreground-light/80 mb-1.5 block text-xs font-bold">
                  {t('hall_label') || 'Hall / Venue'}
                </label>
                <div className="relative">
                  <div className="text-foreground-muted absolute top-1/2 left-3 z-10 -translate-y-1/2">
                    <MapPin size={16} />
                  </div>
                  <FilterDropdown
                    options={hallOptions}
                    selectedValue={selectedHall}
                    onSelect={(value) => setSelectedHall(String(value))}
                    placeholder={t('select_hall_placeholder') || 'Select Hall'}
                    hasIcon
                  />
                </div>
              </div>

              {/* Event Type */}
              <div className="hall-input-group">
                <label className="text-foreground-light/80 mb-1.5 block text-xs font-bold">
                  {t('event_type_label') || 'Event Type'}
                </label>
                <div className="relative">
                  <FilterDropdown
                    options={eventTypeOptions}
                    selectedValue={selectedEventType}
                    onSelect={(value) => setSelectedEventType(String(value))}
                    placeholder={t('select_event_type_placeholder') || 'Select Event Type'}
                  />
                </div>
              </div>

              {/* Date */}
              <div className="hall-input-group">
                <label className="text-foreground-light/80 mb-1.5 block text-xs font-bold">
                  {t('date_label') || 'Date'}
                </label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date: Date | null) => {
                    setSelectedDate(date);
                  }}
                  placeholderText={t('select_date_placeholder') || 'Select date'}
                  dateFormat="MMM d, yyyy"
                  minDate={new Date()}
                  unavailableDates={unavailableDates}
                  showIcon={true}
                  inputClassName="text-sm leading-normal transition-all duration-200 ease-in-out border-border text-foreground placeholder:text-foreground-muted placeholder:text-xs"
                />
              </div>

              {/* Time */}
              <div className="hall-input-group">
                <label className="text-foreground-light/80 mb-1.5 block text-xs font-bold">
                  {t('time_label') || 'Time'}
                </label>
                <div className="relative">
                  <div className="text-foreground-muted absolute top-1/2 left-3 z-10 -translate-y-1/2">
                    <Clock size={16} />
                  </div>
                  <FilterDropdown
                    options={timeOptions}
                    selectedValue={selectedTime}
                    onSelect={(value) => setSelectedTime(String(value))}
                    placeholder={t('select_time_placeholder') || 'Select Time'}
                    hasIcon
                  />
                </div>
              </div>

              {/* Guest Count */}
              <div className="hall-input-group">
                <label className="text-foreground-light/80 mb-1.5 block text-xs font-bold">
                  {t('guest_count_label') || 'Guest Count'}
                </label>
                <div className="relative">
                  <div className="text-foreground-muted absolute top-1/2 left-3 z-10 -translate-y-1/2">
                    <Users size={16} />
                  </div>
                  <FilterDropdown
                    options={guestOptions}
                    selectedValue={guestCount}
                    onSelect={(value) => setGuestCount(Number(value))}
                    placeholder={t('select_guest_count_placeholder') || 'Select Guest Count'}
                    hasIcon
                  />
                </div>
              </div>
            </div>

            {/* Special Requests */}
            <div className="mt-6">
              <label className="text-foreground-light/80 mb-1.5 block text-xs font-bold">
                {t('special_requests_label') || 'Special Requests'}
              </label>
              <textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder={t('special_requests_placeholder') || 'Enter any special requests...'}
                className="border-border text-foreground placeholder:text-foreground-muted focus:outline-accent-gray/60 w-full rounded-md border bg-transparent p-3 text-sm leading-normal placeholder:text-xs focus:outline-3"
                rows={3}
              />
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="bg-accent text-background hover:bg-accent-dark focus:ring-accent flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold shadow-md transition-all hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:outline-none"
              >
                <Calendar size={16} />
                <span>{t('request_rental_button_text') || 'Request Rental'}</span>
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
