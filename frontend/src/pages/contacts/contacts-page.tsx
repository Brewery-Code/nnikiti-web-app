import clsx from "clsx";
import MobileImg from "./mobile.svg?react";
import { Title } from "@/shared/ui";

function ContactBLock({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "flex flex-col gap-4 h-auto p-4 rounded-xl bg-fixed bg-[linear-gradient(135deg,_rgba(30,39,255,0.1)_0%,_rgba(246,0,255,0.1)_33%,_rgba(255,141,0,0.1)_66%,_rgba(0,0,0,0.2)_100%)]",
        className
      )}
    >
      <div className="flex items-center text-[18px] font-semibold">
        <MobileImg className="w-8 h-8" />
        Text us
      </div>
      <p>
        You can simply send us an email. Our Customer Experience team will get
        back with you ASAP.
      </p>
      <ul className="flex flex-col gap-1 text-gray-400">
        <li>Email: 0Mw0T@example.com</li>
        <li>Email: 0Mw0T@example.com</li>
        <li>Email: 0Mw0T@example.com</li>
      </ul>
    </div>
  );
}

export function ContactsPage() {
  return (
    <div className="container-base grow flex flex-col justify-center items-center">
      <Title className="self-start">Contacts</Title>
      <div className="grid grid-cols-[1fr_1fr_1fr] grid-rows-[auto_auto] gap-4 mt-8">
        <ContactBLock className="order-0"></ContactBLock>
        <ContactBLock className="order-1"></ContactBLock>
        <ContactBLock className="order-3 col-span-2"></ContactBLock>
        <div className="order-2 row-span-2 flex flex-col">
          <iframe
            className="h-full rounded-t-xl"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2531.493185409262!2d26.253785593679517!3d50.617954402132256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472f13503e023a0b%3A0x4d65c704c32f0238!2z0J3QsNGG0ZbQvtC90LDQu9GM0L3QuNC5INGD0L3RltCy0LXRgNGB0LjRgtC10YIg0LLQvtC00L3QvtCz0L4g0LPQvtGB0L_QvtC00LDRgNGB0YLQstCwINGC0LAg0L_RgNC40YDQvtC00L7QutC-0YDQuNGB0YLRg9Cy0LDQvdC90Y8!5e0!3m2!1suk!2sua!4v1751898481338!5m2!1suk!2sua"
            loading="lazy"
          />
          <ContactBLock className="rounded-t-none"></ContactBLock>
        </div>
      </div>
    </div>
  );
}

export const Component = ContactsPage;
