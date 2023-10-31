'use client';
import React from 'react';
import { Button, Form, type FormInstance } from 'antd';
const SubmitBtn = ({ form }: { form: FormInstance }) => {
  const [submittable, setSubmittable] = React.useState(false);

  // Watch all values
  const values = Form.useWatch([], form);

  React.useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      },
    );
  }, [form, values]);

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable} className='bg-[#876553]'>
      Submit
    </Button>
  );
};
export default SubmitBtn;