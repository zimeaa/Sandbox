// import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
// import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
// import { OTLPTraceExporter } from '@opentelemetry/exporter-otlp-http';
// import { trace } from '@opentelemetry/api';

// // Create an OTLP exporter to send traces to your OpenTelemetry collector or backend (Jaeger)
// const exporter = new OTLPTraceExporter({
//   url: 'http://localhost:4318/v1/traces', // URL of your OpenTelemetry collector or Jaeger backend
// });

// // Set up the OpenTelemetry provider
// const provider = new WebTracerProvider();
// provider.addSpanProcessor(new SimpleSpanProcessor(exporter));

// // Register the provider with the global tracer
// provider.register();

// // Now, you can start creating spans and adding tracing to your app
// const tracer = trace.getTracer('your-app-name');

// // Example of creating a span
// const span = tracer.startSpan('example-span');
// span.end();
