/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { DetailedHTMLProps, ReactNode, SelectHTMLAttributes } from "react";
import "./Select.css";

type SelectIntrinsicProps = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;
interface SelectProps extends SelectIntrinsicProps {
  label: string;
}

export default function Select({
  children,
  label,
  className,
  ...other
}: SelectProps): ReactNode {
  return (
    <div className="Input__wrapper">
      <label style={{ marginTop: "-1em" }} className="Input__label">
        {label}
      </label>
      <select {...other} className={className || "select"}>
        {children}
      </select>
    </div>
  );
}
